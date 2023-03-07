import { IsString, IsNotEmpty } from "class-validator";

export class CreneauDto {
    @IsNotEmpty()
    @IsString()
    creneau: string;
}