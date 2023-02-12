import { Controller, Post, Body } from '@nestjs/common';
import { BenevoleDto } from 'src/Benevole/BenevoleDTO/benevole.dto';
import { Benevole } from 'src/Benevole/Schema/benevole.schema';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly connectionService: AuthService) {}

    @Post()
    async register(@Body() userData: BenevoleDto): Promise<Partial<Benevole>> {
        return this.connectionService.register(userData);
    }

    @Post('login')
    async login(@Body() userData: {email: string, mdp: string}) {
        return this.connectionService.login(userData.email, userData.mdp);
    }
}