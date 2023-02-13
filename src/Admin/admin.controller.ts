import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Authentification/Guards/auth.jwt.guard';
import { AdminService } from './admin.service';
import { AdminReturn } from './AdminDTO/adminReturn.dto';
import { AdminDto } from './AdminDTO/admin.dto';


@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    @Get()
    getAllAdmins(): Promise<AdminReturn[]> {
        return this.adminService.findAll()
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Get(':id')
    getAdminById(@Param('id') id: string): Promise<AdminReturn> {
        return this.adminService.findOne(id)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Post()
    createAdmin(@Body() newAdmin: AdminDto): Promise<AdminReturn> {
        return this.adminService.create(newAdmin)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Put(':id')
    updateAdmin(@Param('id') id: string, @Body() admin: AdminDto): Promise<AdminReturn> {
        return this.adminService.update(id, admin)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Delete(':id')
    deleteAdmin(@Param('id') id: string): Promise<void> {
        return this.adminService.delete(id)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }
}