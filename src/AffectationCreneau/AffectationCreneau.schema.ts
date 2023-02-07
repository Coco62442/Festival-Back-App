import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Zone } from '../Zone/Zone.schema';
import { Benevole } from '../Benevole/Schema/Benevole.schema';


export type AffectationCreneauDocument = mongoose.HydratedDocument<AffectationCreneau>;

@Schema()
export class AffectationCreneau {
  @Prop({required: true})
  heyreDebut: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true })
  zone: Zone;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Benevole'}], required: true })
  benevoles: Benevole[];
}

export const AffectationCrenauSchema = SchemaFactory.createForClass(AffectationCreneau);