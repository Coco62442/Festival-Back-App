import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BenevoleModule } from '../Benevole/benevole.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategy/passeport.jwt.strategy';
import { AdminModule } from 'src/Admin/admin.module';

@Module({
  imports: [AdminModule, BenevoleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({secret: 'secret', signOptions: {expiresIn: '1h'}})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
