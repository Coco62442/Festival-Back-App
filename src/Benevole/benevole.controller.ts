import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BenevoleService } from './benevole.service';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { Benevole } from './Schema/benevole.schema';

@Controller('benevole')
export class BenevoleController {
  constructor(private readonly benevoleService: BenevoleService) {}

  @Get()
  getAllBenevoles(): Promise<Benevole[]> {
    return this.benevoleService.findAll();
  }

  @Get(':id')
  getBenevoleById(@Param('id') id: string): Promise<Benevole> {
    return this.benevoleService.findOne(id);
  }

  @Post()
  createBenevole(@Body() newBenevole: BenevoleDto): void {
    this.benevoleService.create(newBenevole);
  }

  @Put(':id')
  updateBenevole(@Param('id') id: string, @Body() benevole: BenevoleDto): void {
    this.benevoleService.update(id, benevole);
  }

  @Delete(':id')
  deleteBenevole(@Param('id') id: string): void {
    this.benevoleService.delete(id);
  }
}