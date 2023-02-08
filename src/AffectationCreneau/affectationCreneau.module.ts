import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleService } from 'src/Benevole/benevole.service';
import { Benevole, BenevoleSchema } from 'src/Benevole/Schema/benevole.schema';
import { AffectationCreneauController } from './affectationCreneau.controller';
import { AffectationCreneauService } from './affectationCreneau.service';
import { AffectationCreneau, AffectationCreneauSchema } from './Schema/affectationCreneau.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AffectationCreneau.name, schema: AffectationCreneauSchema }, {name: Benevole.name, schema: BenevoleSchema}])],
  controllers: [AffectationCreneauController],
  providers: [AffectationCreneauService, BenevoleService],
})
export class AffectationCreneauModule {}