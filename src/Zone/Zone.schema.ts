import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { LibelleZone } from './LibelleZone/LibelleZone.schema';
import { Jeu } from '../Jeux/Jeu.schema';


@Schema()
export class Zone {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jeu' })
  jeux: Jeu[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LibelleZone' })
  libelle: LibelleZone;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);