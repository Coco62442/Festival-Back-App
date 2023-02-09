import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AffectationDto {

  @IsNotEmpty()
  @IsDate()
  heureDebut: Date
  
  @IsNotEmpty()
  @IsString()
  idZone: string;
  }