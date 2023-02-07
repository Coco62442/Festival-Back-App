import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenevoleController } from './benevole.controller';
import { BenevoleService } from './benevole.service';
import { Benevole, BenevoleSchema } from './Schema/Benevole.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Benevole.name, schema: BenevoleSchema }])],
  controllers: [BenevoleController],
  providers: [BenevoleService],
})
export class BenevoleModule {}