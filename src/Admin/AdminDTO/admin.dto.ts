import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminDto {

  @IsNotEmpty()
  @IsEmail()
  mailAdmin: string
  
  @IsNotEmpty()
  @IsString()
  mdpAdmin: string;
  }