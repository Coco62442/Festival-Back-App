import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from './ZoneDTO/zone.dto';
import { Zone } from './Schema/zone.schema';
import { JeuService } from 'src/Jeu/jeu.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService, private readonly jeuService: JeuService) {}

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

  @Get("/zoneByJeu/:idJeu")
  getZoneByJeuId(@Param('idJeu') idJeu: string): Promise<Zone[]> {
    return this.zoneService.findZonesByJeuId(idJeu);
  }

  @Put(':zoneId/addJeu/:jeuId')
  async addJeuToZone(@Param('zoneId') zoneId: string, @Param('jeuId') jeuId: string) {
    return this.zoneService.addJeuToZone(zoneId, jeuId);
  }

  @Put(':zoneId/removeJeu/:jeuId')
  async removeJeuFromZone(@Param('zoneId') zoneId: string, @Param('jeuId') jeuId: string) {
    return this.zoneService.removeJeuFromZone(zoneId, jeuId);
  }

}
