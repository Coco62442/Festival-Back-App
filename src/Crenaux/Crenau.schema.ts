import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Zone } from '../Zone/Zone.schema';
import { Benevole } from '../Benevole/Benevole.schema';


@Schema()
export class Crenau {
  @Prop({required: true})
  debut: Date;

  @Prop({required: true})
  fin: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' })
  zone: Zone;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Benevole' })
  benevoles: Benevole[];
}

export const CrenauSchema = SchemaFactory.createForClass(Crenau);