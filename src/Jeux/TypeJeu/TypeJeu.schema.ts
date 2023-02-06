import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TypeJeu {
    @Prop({required: true, unique: true})
    libelle: string;
}

export const TypeJeuSchema = SchemaFactory.createForClass(TypeJeu);