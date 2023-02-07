import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Jeu } from '../../Jeu/Schema/jeu.schema';

export type ZoneDocument = HydratedDocument<Zone>;

@Schema()
export class Zone {
  @Prop()
  nomZone: String;

  @Prop([Jeu])
  jeux: Jeu[];

}

export const ZoneSchema = SchemaFactory.createForClass(Zone);