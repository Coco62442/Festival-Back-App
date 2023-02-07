import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffectationCreneauController } from './affectationCreneau.controller';
import { AffectationCreneauService } from './affectationCreneau.service';
import { AffectationCreneau, AffectationCreneauSchema } from './Schema/affectationCreneau.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AffectationCreneau.name, schema: AffectationCreneauSchema }])],
  controllers: [AffectationCreneauController],
  providers: [AffectationCreneauService],
})
export class BenevoleModule {}