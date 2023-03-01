import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument } from './Schema/zone.schema';
import { ZoneDto } from './ZoneDTO/zone.dto';
import { Jeu, JeuDocument } from 'src/Jeu/Schema/jeu.schema';
import { validate, ValidationError } from 'class-validator';


@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>,
              @InjectModel(Jeu.name) private jeuModel: Model<JeuDocument>) {}

  async create(CreateZoneDto: ZoneDto): Promise<Zone> {
    const createdZone = new this.zoneModel(CreateZoneDto);

    const errors: ValidationError[] = await validate(createdZone);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return await createdZone.save()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, zone: ZoneDto): Promise<Zone> {
    const zoneToUpdate = new this.zoneModel(zone);
    const errors: ValidationError[] = await validate(zoneToUpdate);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return await this.zoneModel.findById(id).exec()
    .then(zone => {
      if (!zone) {
        throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
      }

      zoneToUpdate.nomZone = zoneToUpdate.nomZone ? zoneToUpdate.nomZone : zone.nomZone;
      zoneToUpdate.jeux = zoneToUpdate.jeux ? zoneToUpdate.jeux : zone.jeux;
      zoneToUpdate._id = zone._id;

      return this.zoneModel.findByIdAndUpdate(zone._id, zoneToUpdate, { new: true }).exec()
    })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async delete(id: string): Promise<void> {
    this.zoneModel.deleteOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findAll(): Promise<Zone[]> {
    return this.zoneModel.find().exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<Zone> {
    return this.zoneModel.findOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findZonesByJeuId(idJeu: string): Promise<Zone[]> {
    return this.zoneModel.find({ jeux: { $elemMatch: { _id: idJeu } } });
  }

  async addJeuToZone(zoneId: string, jeuId: string): Promise<Zone> {
    const zone = await this.zoneModel.findById(zoneId);
    if (!zone) {
      throw new NotFoundException('Zone not found');
    }
    const jeu = await this.jeuModel.findById(jeuId);
    if (!jeu) {
      throw new NotFoundException('Jeu not found');
    }

    if (zone.jeux.includes(jeu)) {
      throw new HttpException('Jeu already in zone', HttpStatus.BAD_REQUEST);
    }
    
    zone.jeux.push(jeu);
    const updatedZone = await this.zoneModel.updateOne({ _id: zoneId }, zone);
    if(updatedZone.modifiedCount===0){
      throw new HttpException('Zone not found for update', HttpStatus.NOT_FOUND);
    }
    return await this.zoneModel.findById(zoneId).exec();
  }

  async removeJeuFromZone(zoneId: string, jeuId: string): Promise<Zone> {
    const updatedZone = await this.zoneModel.updateOne({ _id: zoneId }, { $pull: { jeux: { _id: jeuId } } });
    if(updatedZone.modifiedCount===0){
      throw new HttpException('Zone not updated', HttpStatus.NOT_FOUND);
    }
    return await this.zoneModel.findById(zoneId).exec();
  }

}