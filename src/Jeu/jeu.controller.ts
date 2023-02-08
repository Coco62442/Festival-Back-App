import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JeuService } from './jeu.service';
import { JeuDto } from './JeuDTO/jeu.dto';
import { Jeu } from './Schema/jeu.schema';

@Controller('jeu')
export class JeuController {
  constructor(private readonly jeuService: JeuService) {}

  @Get()
  getAllJeux(): Promise<Jeu[]> {
    return this.jeuService.findAll();
  }

  @Get(":id")
  getJeuById(@Param('id') id: string): Promise<Jeu> {
    return this.jeuService.findOne(id);
  }

  @Post()
  createJeu(@Body() newJeu: JeuDto): void {
    this.jeuService.create(newJeu);
  }

  @Put(":id")
  updateJeu(@Param('id') id: string, @Body() jeu: JeuDto): Promise<Jeu> {
    return this.jeuService.update(id, jeu);
  }

  @Delete(":id")
  deleteJeu(@Param('id') id: string): void {
    this.jeuService.delete(id);
  }
}
