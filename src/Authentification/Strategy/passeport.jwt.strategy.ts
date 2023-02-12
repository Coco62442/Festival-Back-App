import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Benevole } from 'src/Benevole/Schema/benevole.schema';
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

  async validate(payload: Partial<Benevole>) {
    await this.BenevoleService.findOne(payload.emailBenevole)
    .then(benevole => {
        const { mdpBenevole, ...result } = benevole;
        return result;
    })
    .catch(error => {
        throw new UnauthorizedException();
    });    
  }
}