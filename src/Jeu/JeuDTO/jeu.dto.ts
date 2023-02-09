import { TypeJeu } from "../TypeJeu";
import { IsNotEmpty, IsString } from "class-validator";


export class JeuDto {

  @IsString()
  @IsNotEmpty()
  nomJeu: string;

  @IsNotEmpty()
  @IsString()
  typeJeu: TypeJeu;
  
  }