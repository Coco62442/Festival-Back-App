import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from './ZoneDTO/zone.dto';
import { Zone } from './Schema/zone.schema';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  getAllZones(): Promise<Zone[]> {
    return this.zoneService.findAll();
  }

  @Get(":id")
  getZoneById(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.findOne(id);
  }

  @Post()
  createZone(@Body() newZone: ZoneDto): void {
    this.zoneService.create(newZone);
  }

  @Put(":id")
  updateZone(@Param('id') id: string, @Body() zone: ZoneDto): Promise<Zone> {
    return this.zoneService.update(id, zone);
  }

  @Delete(":id")
  deleteZone(@Param('id') id: string): void {
    this.zoneService.delete(id);
  }
}
