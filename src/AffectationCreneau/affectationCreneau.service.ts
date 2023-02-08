import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AffectationCreneau, AffectationCreneauDocument } from './Schema/affectationCreneau.schema';
import { AffectationCreneauDto } from './AffectationCreneauDTO/affectationCreneau.dto';

@Injectable()
export class AffectationCreneauService {
  constructor(@InjectModel(AffectationCreneau.name) private affectationCreneauModel: Model<AffectationCreneauDocument>) {}

  async create(CreateAffectationCreneauDto: AffectationCreneauDto): Promise<AffectationCreneau> {
    const createdAffectationCreneau = new this.affectationCreneauModel(CreateAffectationCreneauDto);
    return createdAffectationCreneau.save();
  }

  async update(id: string, affectationCreneau: AffectationCreneauDto): Promise<AffectationCreneau> {
    const updatedAffectationCreneauDto = new this.affectationCreneauModel(affectationCreneau);
    // TODO : faire en sorte que l'update update seulement les champs qui ont été modifiés
    
    return updatedAffectationCreneauDto.updateOne({ _id: id }, affectationCreneau).exec();
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


}