import { Benevole } from "src/Benevole/Schema/benevole.schema";
import { Zone } from "src/Zone/Schema/zone.schema";

export class AffectationCreneauDto {

    // TODO : class-validator IsBoolean IsEmail etc
    heyreDebut: Date
    
    zone: Zone;
    
    benevoles: Benevole[];
  
  }