import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from './ZoneDTO/zone.dto';
import { Zone } from './Schema/zone.schema';
import { JeuService } from 'src/Jeu/jeu.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService, private readonly jeuService: JeuService) {}

  @Get()
  getAllZones(): Promise<Zone[]> {
    return this.zoneService.findAll()
    .catch(error => {
      console.log(error.message);
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(":id")
  getZoneById(@Param('id') id: string): Promise<Zone> {
    return this.zoneService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createZone(@Body() newZone: ZoneDto): Promise<Zone> {
    return this.zoneService.create(newZone)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(":id")
  updateZone(@Param('id') id: string, @Body() zone: ZoneDto): Promise<Zone> {
    return this.zoneService.update(id, zone)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(":id")
  deleteZone(@Param('id') id: string): Promise<void> {
    return this.zoneService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get("/zoneByJeu/:idJeu")
  getZoneByJeuId(@Param('idJeu') idJeu: string): Promise<Zone[]> {
    return this.zoneService.findZonesByJeuId(idJeu)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':zoneId/addJeu/:jeuId')
  async addJeuToZone(@Param('zoneId') zoneId: string, @Param('jeuId') jeuId: string): Promise<Zone> {
    return this.zoneService.addJeuToZone(zoneId, jeuId)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':zoneId/removeJeu/:jeuId')
  async removeJeuFromZone(@Param('zoneId') zoneId: string, @Param('jeuId') jeuId: string): Promise<Zone> {
    return this.zoneService.removeJeuFromZone(zoneId, jeuId)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

}
