import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benevole, BenevoleDocument } from './Schema/benevole.schema';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';

@Injectable()
export class BenevoleService {
  constructor(@InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateBenevoleDto: BenevoleDto): Promise<Benevole> {
    const createdBenevole = new this.benevoleModel(CreateBenevoleDto);
    return createdBenevole.save();
  }

  async update(id: string, benevole: BenevoleDto): Promise<Benevole> {
    const updatedBenevoleDto = new this.benevoleModel(benevole);
    // TODO : faire en sorte que l'update update seulement les champs qui ont été modifiés
    
    updatedBenevoleDto.valider = true;
    return updatedBenevoleDto.updateOne({ _id: id }, benevole).exec();

    // return this.affectationCreneauModel.findByIdAndUpdate(id, { ...affectationCreneau, benevoles }, { new: true }).exec()
    // .then(affectation => {
    //   if (!affectation) {
    //     throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
    //   }
    //   return affectation;
    // })
    // .catch(error => {
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // });
  }

  async delete(id: string): Promise<any> {
    return this.benevoleModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<Benevole[]> {
    return this.benevoleModel.find().exec();
  }

  async findOne(id: string): Promise<Benevole> {
    return this.benevoleModel.findOne({ _id: id }).exec();
  }


}