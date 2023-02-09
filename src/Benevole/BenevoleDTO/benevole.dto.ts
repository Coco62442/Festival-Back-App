import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class BenevoleDto {

  @IsString()
  @IsNotEmpty()
  prenomBenevole: string;

  @IsString()
  @IsNotEmpty()
  nomBenevole: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  emailBenevole: string;

  @IsString()
  @IsPhoneNumber("FR")
  telBenevole?: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  mdpBenevole: string;

  valider: boolean = false;

}