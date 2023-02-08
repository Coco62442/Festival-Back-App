import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument } from './Schema/zone.schema';
import { ZoneDto } from './ZoneDTO/zone.dto';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>) {}

  async create(CreateZoneDto: ZoneDto): Promise<Zone> {
    const createdZone = new this.zoneModel(CreateZoneDto);
    return createdZone.save()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, zone: ZoneDto): Promise<Zone> {
    const updatedZone = await this.zoneModel.updateOne({ _id: id }, zone);
    if(updatedZone.modifiedCount===0){
      throw new HttpException('Zone not found', HttpStatus.NOT_FOUND);
    }
    return await this.zoneModel.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    return this.zoneModel.deleteOne({ _id: id }).exec()
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

}