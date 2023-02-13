import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type AdminDocument = HydratedDocument<Admin>;

@Schema({ collection: "Admin" })
export class Admin {

  _id: any;

  @Prop({required: true, unique: true})
  mailAdmin: string;

  @Prop({required: true})
  mdpAdmin: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);