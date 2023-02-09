import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Zone } from '../../Zone/Schema/zone.schema';
import { Benevole } from '../../Benevole/Schema/benevole.schema';


export type AffectationDocument = mongoose.HydratedDocument<Affectation>;

@Schema()
export class Affectation {
  @Prop({required: true})
  heureDebut: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true })
  zone: Zone;

  @Prop([Benevole])
  benevoles: Benevole[];
}

export const AffectationSchema = SchemaFactory.createForClass(Affectation);