import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type BenevoleDocument = HydratedDocument<Benevole>;

@Schema({ collection: "Benevole" })
export class Benevole {

  _id: any;
  
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

  @Prop()
  mdpBenevole: string;

  @Prop({default: false})
  valider: boolean;
}

export const BenevoleSchema = SchemaFactory.createForClass(Benevole);