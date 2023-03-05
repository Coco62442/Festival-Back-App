import { Controller, Get, Post, Put, Delete, Patch, Param, Body, HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Authentification/Guards/auth.jwt.guard';
import { BenevoleService } from './benevole.service';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { BenevoleReturn } from './BenevoleDTO/benevoleReturn';


@Controller('benevole')
export class BenevoleController {
  constructor(private readonly benevoleService: BenevoleService) {}

  @Get()
  getAllBenevoles(): Promise<BenevoleReturn[]> {
    return this.benevoleService.findAll()
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get('nouveaux')
  @UseGuards(JwtAuthGuard)
  getNewsBenevoles(): Promise<BenevoleReturn[]> {
    return this.benevoleService.newBenevoles()
    .catch(error => {
      throw new HttpException(error.message, error.status)
    })
  }

  @Get(':id')
  getBenevoleById(@Param('id') id: string): Promise<BenevoleReturn> {
    return this.benevoleService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Post()
  createBenevole(@Body() newBenevole: BenevoleDto): Promise<BenevoleReturn> {
    return this.benevoleService.create(newBenevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateBenevole(@Param('id') id: string, @Body() benevole: BenevoleDto): Promise<BenevoleReturn> {
    return this.benevoleService.update(id, benevole)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteBenevole(@Param('id') id: string): Promise<void> {
    return this.benevoleService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put('validate/:id')
  @UseGuards(JwtAuthGuard)
  validateBenevole(@Param('id') id: string): Promise<BenevoleReturn> {
    return this.benevoleService.validateBenevole(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}