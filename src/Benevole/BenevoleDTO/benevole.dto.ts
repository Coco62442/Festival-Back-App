export class BenevoleDto {

  // TODO : class-validator IsBoolean IsEmail etc
  prenomBenevole: string;

  nomBenevole: string;

  emailBenevole: string;

  telBenevole?: string;

  description?: string;

  mdpBenevole: string;

  valider: boolean = false;

}