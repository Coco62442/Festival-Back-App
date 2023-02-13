import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Authentification/Guards/auth.jwt.guard';
import { JeuService } from './jeu.service';
import { JeuDto } from './JeuDTO/jeu.dto';
import { Jeu } from './Schema/jeu.schema';

@Controller('jeu')
export class JeuController {
  constructor(private readonly jeuService: JeuService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createJeu(@Body() newJeu: JeuDto): Promise<Jeu> {
    return this.jeuService.create(newJeu)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updateJeu(@Param('id') id: string, @Body() jeu: JeuDto): Promise<Jeu> {
    return this.jeuService.update(id, jeu)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteJeu(@Param('id') id: string): Promise<void> {
    return this.jeuService.delete(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  // GETTER
  
  @Get()
  getAllJeux(): Promise<Jeu[]> {
    return this.jeuService.findAll()
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get(":id")
  getJeuById(@Param('id') id: string): Promise<Jeu> {
    return this.jeuService.findOne(id)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get("/byName/:name")
  getJeuxByName(@Param('name') name: string): Promise<Jeu[]> {
    return this.jeuService.findJeuxByName(name)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  @Get("/byType/:type")
  getJeuxByType(@Param('type') type: string): Promise<Jeu[]> {
    return this.jeuService.findJeuxByType(type)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}
