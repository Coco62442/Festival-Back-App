import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AffectationCreneauService } from './affectationCreneau.service';
import { AffectationCreneauDto } from './AffectationCreneauDTO/affectationCreneau.dto';
import { AffectationCreneau } from './Schema/affectationCreneau.schema';

@Controller('affectationCreneau')
export class AffectationCreneauController {
  constructor(private readonly affectationCreneauService: AffectationCreneauService) {}

  @Get()
  getAllAffectationCreneau(): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findAll();
  }

  @Get('ByCreneau')
  getAffectationCreneauByCreneau(@Body() creneau: Date): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findByCreneau(creneau);
  }

  @Get('ByZone:idZone')
  getAffectationCreneauByZone(@Param('idZone') idZone : string): Promise<AffectationCreneau[]> {
    return this.affectationCreneauService.findByZone(idZone);
  }

  @Get(':id')
  getAffectationCreneauById(@Param('id') id: string): Promise<AffectationCreneau> {
    return this.affectationCreneauService.findOne(id);
  }

  @Post()
  createAffectationCreneau(@Body() newAffectationCreneau: AffectationCreneauDto): void {
    this.affectationCreneauService.create(newAffectationCreneau);
  }

  @Put(':id')
  updateAffectationCreneau(@Param('id') id: string, @Body() affectationCreneau: AffectationCreneauDto): void {
    this.affectationCreneauService.update(id, affectationCreneau);
  }

  @Delete(':id')
  deleteAffectationCreneau(@Param('id') id: string): void {
    this.affectationCreneauService.delete(id);
  }
}