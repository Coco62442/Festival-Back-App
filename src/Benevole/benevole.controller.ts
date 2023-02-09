import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { BenevoleService } from './benevole.service';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { Benevole } from './Schema/benevole.schema';

@Controller('benevole')
export class BenevoleController {
  constructor(private readonly benevoleService: BenevoleService) {}

  @Get()
  getAllBenevoles(): Promise<Benevole[]> {
    return this.benevoleService.findAll()
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(':id')
  getBenevoleById(@Param('id') id: string): Promise<Benevole> {
    return this.benevoleService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('nouveauBenevole')
  getNewBenevole(): Promise<Benevole[]> {
    return this.benevoleService.newBenevoles()
    .catch(error => {
      throw new HttpException(error.message, error.status)
    })
  }

  @Post()
  createBenevole(@Body() newBenevole: BenevoleDto): Promise<Benevole> {
    return this.benevoleService.create(newBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':id')
  updateBenevole(@Param('id') id: string, @Body() benevole: BenevoleDto): Promise<Benevole> {
    return this.benevoleService.update(id, benevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  deleteBenevole(@Param('id') id: string): Promise<void> {
    return this.benevoleService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}