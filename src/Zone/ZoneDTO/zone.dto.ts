import { Jeu } from "src/Jeu/Schema/jeu.schema";
import { IsString, IsNotEmpty, IsArray, IsDefined } from 'class-validator';


export class ZoneDto {

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nomZone: string;

  @IsArray()
  jeux: Jeu[];
  
}