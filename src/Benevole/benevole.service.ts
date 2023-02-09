import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benevole, BenevoleDocument } from './Schema/benevole.schema';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { validate, ValidationError } from 'class-validator';


@Injectable()
export class BenevoleService {
  constructor(@InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateBenevoleDto: BenevoleDto): Promise<Benevole> {
    const createdBenevole = new this.benevoleModel(CreateBenevoleDto);
    const errors: ValidationError[] = await validate(createdBenevole);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return createdBenevole.save()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, benevole: BenevoleDto): Promise<Benevole> {
    // TODO : faire en sorte que l'update update seulement les champs qui ont été modifiés

    const benevoleToUpdate = new this.benevoleModel(benevole);
    const errors: ValidationError[] = await validate(benevoleToUpdate);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.benevoleModel.updateOne({ _id: id }, benevoleToUpdate)
    .catch(() => {
      throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
    });
    
    return await this.benevoleModel.findById(id).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async delete(id: string): Promise<void> {
    this.benevoleModel.deleteOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findAll(): Promise<Benevole[]> {
    return this.benevoleModel.find().exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<Benevole> {
    return this.benevoleModel.findOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async newBenevoles(): Promise<Benevole[]> {
    return this.benevoleModel.find({valider: false}).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }


}