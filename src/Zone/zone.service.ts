import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument } from './Schema/zone.schema';
import { ZoneDto } from './ZoneDTO/zone.dto';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>) {}

  async create(CreateZoneDto: ZoneDto): Promise<Zone> {
    const createdZone = new this.zoneModel(CreateZoneDto);
    return createdZone.save();
  }

  async update(id: string, zone: ZoneDto): Promise<Zone> {
    const updatedZone = new this.zoneModel(zone);
    return updatedZone.updateOne({ _id: id }, zone);
  }

  async delete(id: string): Promise<any> {
    return this.zoneModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<Zone[]> {
    return this.zoneModel.find().exec();
  }

  async findOne(id: string): Promise<Zone> {
    return this.zoneModel.findOne({ _id: id }).exec();
  }

}