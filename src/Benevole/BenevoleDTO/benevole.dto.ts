import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsEmpty, IsBoolean } from 'class-validator';

export class BenevoleDto {

  @IsEmpty()
  _id?: string;

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

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  telBenevole?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  mdpBenevole: string;

  @IsOptional()
  @IsBoolean()
  valider: boolean = false;

}