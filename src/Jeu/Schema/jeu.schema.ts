import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TypeJeu } from '../TypeJeu';

export type JeuDocument = HydratedDocument<Jeu>;

@Schema()
export class Jeu {

    @Prop({required: true})
    nomJeu: string;
    
    @Prop({ type: String, enum: TypeJeu })
    typeJeu: TypeJeu;

}

export const JeuSchema = SchemaFactory.createForClass(Jeu);