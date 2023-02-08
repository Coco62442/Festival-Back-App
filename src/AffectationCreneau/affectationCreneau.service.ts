import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AffectationCreneau, AffectationCreneauDocument } from './Schema/affectationCreneau.schema';
import { AffectationCreneauDto } from './AffectationCreneauDTO/affectationCreneau.dto';
import { Benevole, BenevoleDocument } from 'src/Benevole/Schema/benevole.schema';

@Injectable()
export class AffectationCreneauService {
  constructor(@InjectModel(AffectationCreneau.name) private affectationCreneauModel: Model<AffectationCreneauDocument>, 
              @InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateAffectationCreneauDto: AffectationCreneauDto): Promise<AffectationCreneau> {
    const createdAffectationCreneau = new this.affectationCreneauModel(CreateAffectationCreneauDto);
    return createdAffectationCreneau.save()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, affectationCreneau: AffectationCreneauDto): Promise<AffectationCreneau> {
    let benevoles: Array<Benevole>;
    await this.affectationCreneauModel.findById(id)
    .then(affectation => {
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }
      benevoles = affectation.benevoles;
    })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  
    return this.affectationCreneauModel.findByIdAndUpdate(id, { ...affectationCreneau, benevoles }, { new: true }).exec()
    .then(affectation => {
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }
      return affectation;
    })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async delete(id: string): Promise<any> {
    return this.affectationCreneauModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<AffectationCreneau[]> {
    return this.affectationCreneauModel.find().exec();
  }

  async findOne(id: string): Promise<AffectationCreneau> {
    return this.affectationCreneauModel.findOne({ _id: id }).exec();
  }

  async findByCreneau(creneau: Date): Promise<AffectationCreneau[]> {
    return this.affectationCreneauModel.find({ heureDebut: creneau }).exec();
  }

  async findByZone(idZone: string): Promise<AffectationCreneau[]> {
    return this.affectationCreneauModel.find({ zone: idZone }).exec();
  }

  async addBenevole(idAffectation: string, idBenevole: string): Promise<AffectationCreneau> {
    let affectation;
    try {
      affectation = await this.affectationCreneauModel.findById(idAffectation);
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }
  
      const benevoleToAdd = await this.benevoleModel.findById(idBenevole);
      if (!benevoleToAdd) {
        throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
      }
  
      affectation.benevoles.push(benevoleToAdd);
      await affectation.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    return affectation;
  }
  
  async removeBenevole(idAffectation: string, idBenevole: string): Promise<AffectationCreneau> {
    let affectation;
    try {
      affectation = await this.affectationCreneauModel.findById(idAffectation);
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }
  
      const benevoleToDelete = await this.benevoleModel.findById(idBenevole);
      if (!benevoleToDelete) {
        throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
      }
  
      const updatedAffectationCreneau = await this.affectationCreneauModel.updateOne(
        { _id: idAffectation }, 
        { $pull: { benevoles: { _id: idBenevole } } }
      );
  
      if (updatedAffectationCreneau.modifiedCount === 0) {
        throw new HttpException('AffectationCreneau not updated', HttpStatus.NOT_FOUND);
      }
  
      affectation = await this.affectationCreneauModel.findById(idAffectation).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return affectation;
  }
}