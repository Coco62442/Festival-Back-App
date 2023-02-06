import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LibelleZone {
    @Prop({required: true, unique: true})
    nom: string;
}

export const LibelleZoneSchema = SchemaFactory.createForClass(LibelleZone);