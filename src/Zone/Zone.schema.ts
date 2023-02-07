import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Jeu } from '../Jeux/Jeu.schema';


@Schema()
export class Zone {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'nomZone' })
  nomZone: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jeu' })
  jeux: Jeu[];
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);