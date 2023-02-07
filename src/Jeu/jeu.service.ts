import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jeu, JeuDocument } from './Schema/jeu.schema';
import { JeuDto } from './JeuDTO/jeu.dto';

@Injectable()
export class JeuService {
  constructor(@InjectModel(Jeu.name) private jeuModel: Model<JeuDocument>) {}

  async create(CreateJeuDto: JeuDto): Promise<Jeu> {
    const createdJeu = new this.jeuModel(CreateJeuDto);
    return createdJeu.save();
  }

  async update(id: string, jeu: JeuDto): Promise<Jeu> {
    const updatedJeu = new this.jeuModel(jeu);
    return updatedJeu.updateOne({ _id: id }, jeu);
  }

  async delete(id: string): Promise<any> {
    return this.jeuModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<Jeu[]> {
    return this.jeuModel.find().exec();
  }

  async findOne(id: string): Promise<Jeu> {
    return this.jeuModel.findOne({ _id: id }).exec();
  }

}