import { IsNotEmpty, IsString } from "class-validator";

export class AffectationBenevolesDto {

  @IsNotEmpty()
  @IsString()
  affectation: string
  
  @IsNotEmpty()
  @IsString()
  benevole: string;
  }