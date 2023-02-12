import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type BenevoleDocument = HydratedDocument<Benevole>;

@Schema()
export class Benevole {

  @Prop()
  _id: string;
  
  @Prop({required: true})
  prenomBenevole: string;

  @Prop({required: true})
  nomBenevole: string;

  @Prop({required: true, unique: true})
  emailBenevole: string;

  @Prop()
  telBenevole: string;

  @Prop()
  description: string;

  @Prop({required: true})
  mdpBenevole: string;

  @Prop({default: false})
  valider: boolean;
}

export const BenevoleSchema = SchemaFactory.createForClass(Benevole);