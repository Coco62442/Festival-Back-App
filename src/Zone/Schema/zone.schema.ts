import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Jeu } from '../../Jeu/Schema/jeu.schema';

export type ZoneDocument = HydratedDocument<Zone>;

@Schema({ collection: "Zone" })
export class Zone {

  _id: any;
  
  @Prop()
  nomZone: String;

  @Prop([Jeu])
  jeux: Jeu[];

}

export const ZoneSchema = SchemaFactory.createForClass(Zone);