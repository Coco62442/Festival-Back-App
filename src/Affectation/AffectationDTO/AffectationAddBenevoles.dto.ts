import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Benevole } from "src/Benevole/Schema/benevole.schema";

export class AffectationAddBenevolesDto {

    @IsNotEmpty()
    @IsString()
    affectation: string

    @IsNotEmpty()
    @IsArray()
    benevole: Benevole;
}