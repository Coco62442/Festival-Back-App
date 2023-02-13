import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TypeJeu } from '../TypeJeu';

export type JeuDocument = HydratedDocument<Jeu>;

@Schema({ collection: "Jeu" })
export class Jeu {

    _id: any;
    
    @Prop({required: true})
    nomJeu: string;
    
    @Prop({ type: String, enum: TypeJeu })
    typeJeu: TypeJeu;

}

export const JeuSchema = SchemaFactory.createForClass(Jeu);