import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JeuController } from './jeu.controller';
import { JeuService } from './jeu.service';
import { Jeu, JeuSchema } from './Schema/jeu.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Jeu.name, schema: JeuSchema }])],
  controllers: [JeuController],
  providers: [JeuService]
})

export class JeuModule {}