import { Controller, Post, Body } from '@nestjs/common';
import { AdminDto } from 'src/Admin/AdminDTO/admin.dto';
import { AdminReturn } from 'src/Admin/AdminDTO/adminReturn.dto';
import { BenevoleDto } from 'src/Benevole/BenevoleDTO/benevole.dto';
import { BenevoleReturn } from 'src/Benevole/BenevoleDTO/benevoleReturn';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async register(@Body() userData: AdminDto): Promise<Partial<AdminReturn>> {
        return this.authService.register(userData);
    }

    @Post('login')
    async login(@Body() userData: {mailAdmin: string, mdpAdmin: string}): Promise<{token: string}> {
        return this.authService.login(userData.mailAdmin, userData.mdpAdmin);
    }
}