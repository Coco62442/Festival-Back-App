import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BenevoleService } from 'src/Benevole/benevole.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private configService: ConfigService
    private readonly BenevoleService: BenevoleService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: Change this secret
      secretOrKey: "secret",
      // configService.get('SECRET')
    });
  }

  async validate(payload: any) {
    return await this.BenevoleService.findOne(payload.benevole._id)
    .then(benevole => {
      return {
        _id: benevole._id,
        nomBenevole: benevole.nomBenevole,
        prenomBenevole: benevole.prenomBenevole,
        emailBenevole: benevole.emailBenevole,
        telBenevole: benevole.telBenevole,
        description: benevole.description
      };
    })
    .catch(error => {
      throw new UnauthorizedException();
    });    
  }
}