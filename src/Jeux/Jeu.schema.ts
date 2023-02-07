import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TypeJeu } from './TypeJeu.ts';


@Schema()
export class Jeu {

    //_id: Types.ObjectId;

    @Prop({required: true})
    nom: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeJeu' })
    type: TypeJeu;
}

export const JeuSchema = SchemaFactory.createForClass(Jeu);