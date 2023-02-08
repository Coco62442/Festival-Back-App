import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AffectationCreneau, AffectationCreneauDocument } from './Schema/affectationCreneau.schema';
import { AffectationCreneauDto } from './AffectationCreneauDTO/affectationCreneau.dto';
import { Benevole, BenevoleDocument } from 'src/Benevole/Schema/benevole.schema';

@Injectable()
export class AffectationCreneauService {
  constructor(@InjectModel(AffectationCreneau.name) private affectationCreneauModel: Model<AffectationCreneauDocument>, 
              @InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateAffectationCreneauDto: AffectationCreneauDto): Promise<AffectationCreneau> {
    
    const createdAffectationCreneauDto = new this.affectationCreneauModel(CreateAffectationCreneauDto);
    return createdAffectationCreneauDto.save();
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

  async findByCreneau(creneau: Date): Promise<AffectationCreneau[]> {
    return this.affectationCreneauModel.find({ heureDebut: creneau }).exec();
  }

  async findByZone(idZone: string): Promise<AffectationCreneau[]> {
    return this.affectationCreneauModel.find({ zone: idZone }).exec();
  }

}