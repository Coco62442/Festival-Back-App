import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({required: true, unique: true})
  mailAdmin: string;

  @Prop({required: true})
  mdpAdmin: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);