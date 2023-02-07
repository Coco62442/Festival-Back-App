import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benevole, BenevoleDocument } from './Schema/Benevole.schema';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { BenevoleUpdateDto } from './BenevoleDTO/benevole.update.dto';

@Injectable()
export class BenevoleService {
  constructor(@InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateBenevoleDto: BenevoleDto): Promise<Benevole> {
    const createdBenevole = new this.benevoleModel(CreateBenevoleDto);
    return createdBenevole.save();
  }

  async update(id: string, benevole: BenevoleUpdateDto): Promise<Benevole> {
    const updatedBenevoleDto = new this.benevoleModel(benevole);
    return updatedBenevoleDto.updateOne({ _id: id }, benevole);
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