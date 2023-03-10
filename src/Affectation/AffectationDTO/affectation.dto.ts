import { IsNotEmpty, IsString } from "class-validator";

export class AffectationDto {

  @IsNotEmpty()
  @IsString()
  heureDebut: string
  
  @IsNotEmpty()
  @IsString()
  idZone: string;
  }