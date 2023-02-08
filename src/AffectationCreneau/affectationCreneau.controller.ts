import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { AffectationCreneauService } from './affectationCreneau.service';
import { AffectationCreneauDto } from './AffectationCreneauDTO/affectationCreneau.dto';
import { AffectationCreneau } from './Schema/affectationCreneau.schema';

@Controller('affectationCreneau')
export class AffectationCreneauController {
  constructor(private readonly affectationCreneauService: AffectationCreneauService) {}

  @Get()
  getAllAffectationCreneau(): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findAll()
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('ByCreneau')
  getAffectationCreneauByCreneau(@Body() creneau: Date): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findByCreneau(creneau)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('ByZone:idZone')
  getAffectationCreneauByZone(@Param('idZone') idZone : string): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findByZone(idZone)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getAffectationCreneauById(@Param('id') id: string): Promise<AffectationCreneau> {
    return this.affectationCreneauService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createAffectationCreneau(@Body() newAffectationCreneau: AffectationCreneauDto): void {
    this.affectationCreneauService.create(newAffectationCreneau)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':id')
  updateAffectationCreneau(@Param('id') id: string, @Body() affectationCreneau: AffectationCreneauDto): void {
    this.affectationCreneauService.update(id, affectationCreneau)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteAffectationCreneau(@Param('id') id: string): void {
    this.affectationCreneauService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post('addBenevole/:idAffectation/:idBenevole')
  addBenevoleToAffectationCreneau(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<AffectationCreneau> {
    return this.affectationCreneauService.addBenevole(idAffectation, idBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete('removeBenevole/:idAffectation/:idBenevole')
  removeBenevoleFromAffectationCreneau(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<AffectationCreneau> {
    return this.affectationCreneauService.removeBenevole(idAffectation, idBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}