import { Jeu } from "src/Jeu/Schema/jeu.schema";
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';


export class ZoneDto {

  _id: string;
  
  @IsString()
  @IsNotEmpty()
  nomZone: string;

  @IsArray()
  @IsOptional()
  jeux: Jeu[];
  
}