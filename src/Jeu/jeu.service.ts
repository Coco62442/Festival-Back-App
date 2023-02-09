import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jeu, JeuDocument } from './Schema/jeu.schema';
import { JeuDto } from './JeuDTO/jeu.dto';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class JeuService {
  constructor(@InjectModel(Jeu.name) private jeuModel: Model<JeuDocument>) {}

  async create(CreateJeuDto: JeuDto): Promise<Jeu> {
    const createdJeu = new this.jeuModel(CreateJeuDto);

    const errors: ValidationError[] = await validate(createdJeu);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return await createdJeu.save()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, jeu: JeuDto): Promise<Jeu> {
    const jeuToUpdate = new this.jeuModel(jeu);

    const errors: ValidationError[] = await validate(jeuToUpdate);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const updatedJeu = await this.jeuModel.updateOne({ _id: id }, jeu);
    if (updatedJeu.modifiedCount === 0) {
      throw new HttpException('Jeu not found', HttpStatus.NOT_FOUND);
    }
    return await this.jeuModel.findById(id).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async delete(id: string): Promise<void> {
    this.jeuModel.deleteOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  // FIND

  async findAll(): Promise<Jeu[]> {
    return this.jeuModel.find().exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<Jeu> {
    return this.jeuModel.findOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findJeuxByName(name: string): Promise<Jeu[]> {
    return this.jeuModel.find({nomJeu: { $regex: '.*' + name + '.*' } })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findJeuxByType(type: string): Promise<Jeu[]> {
    return this.jeuModel.find({typeJeu: { $regex: type} })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

}