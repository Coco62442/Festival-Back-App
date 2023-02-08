import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { Zone, ZoneSchema } from './Schema/zone.schema';
import { JeuSchema } from 'src/Jeu/Schema/jeu.schema';
import { Jeu } from 'src/Jeu/Schema/jeu.schema';
import { JeuService } from 'src/Jeu/jeu.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema },{ name: Jeu.name, schema: JeuSchema }])],
  controllers: [ZoneController],
  providers: [ZoneService, JeuService]
})

export class ZoneModule {}