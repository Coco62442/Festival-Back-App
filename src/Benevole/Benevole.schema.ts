import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Benevole {
  @Prop({required: true})
  prenom: string;

  @Prop({required: true})
  nom: string;

  @Prop({required: true, unique: true})
  email: string;
}

export const BenevoleSchema = SchemaFactory.createForClass(Benevole);