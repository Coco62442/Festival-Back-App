import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BenevoleService } from 'src/Benevole/benevole.service';
import { AdminService } from 'src/Admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private configService: ConfigService
    private readonly adminService: AdminService
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
    return await this.adminService.findOne(payload.admin._id)
    .catch(error => {
      throw new UnauthorizedException();
    });   
  }
}