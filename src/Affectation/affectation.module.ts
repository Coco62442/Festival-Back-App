import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleService } from 'src/Benevole/benevole.service';
import { Benevole, BenevoleSchema } from 'src/Benevole/Schema/benevole.schema';
import { AffectationController } from './affectation.controller';
import { AffectationService } from './affectation.service';
import { Affectation, AffectationSchema } from './Schema/affectation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Affectation.name, schema: AffectationSchema }, {name: Benevole.name, schema: BenevoleSchema}])],
  controllers: [AffectationController],
  providers: [AffectationService, BenevoleService],
})
export class AffectationModule {}