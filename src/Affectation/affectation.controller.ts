import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationDto } from './AffectationDTO/affectation.dto';
import { Affectation } from './Schema/affectation.schema';

@Controller('affectation')
export class AffectationController {
  constructor(private readonly affectationService: AffectationService) {}

  @Get()
  getAllAffectation(): Promise<Affectation[]> {
    return this.affectationService.findAll()
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('ByCreneau')
  getAffectationByCreneau(@Body() creneau: Date): Promise<Affectation[]> {
    return this.affectationService.findByCreneau(creneau)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('ByZone:idZone')
  getAffectationByZone(@Param('idZone') idZone : string): Promise<Affectation[]> {
    return this.affectationService.findByZone(idZone)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getAffectationById(@Param('id') id: string): Promise<Affectation> {
    return this.affectationService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createAffectation(@Body() newAffectation: AffectationDto): Promise<Affectation> {
    return this.affectationService.create(newAffectation)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':id')
  updateAffectation(@Param('id') id: string, @Body() affectation: AffectationDto): Promise<Affectation> {
    return this.affectationService.update(id, affectation)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteAffectation(@Param('id') id: string): Promise<void> {
    return this.affectationService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post('addBenevole/:idAffectation/:idBenevole')
  addBenevoleToAffectation(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<Affectation> {
    return this.affectationService.addBenevole(idAffectation, idBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete('removeBenevole/:idAffectation/:idBenevole')
  removeBenevoleFromAffectation(@Param('idAffectation') idAffectation: string, @Param('idBenevole') idBenevole: string): Promise<Affectation> {
    return this.affectationService.removeBenevole(idAffectation, idBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}