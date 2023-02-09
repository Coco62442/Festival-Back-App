import { Jeu } from "src/Jeu/Schema/jeu.schema";
import { IsString, IsNotEmpty, IsArray } from 'class-validator';


export class ZoneDto {

  @IsString()
  @IsNotEmpty()
  nomZone: string;

  @IsArray()
  jeux: Jeu[];
  
}