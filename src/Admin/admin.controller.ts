import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './AdminDTO/admin.dto';
import { Admin } from './Schema/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    @Get()
    getAllAdmins(): Promise<Admin[]> {
        return this.adminService.findAll()
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Get(':id')
    getAdminById(@Param('id') id: string): Promise<Admin> {
        return this.adminService.findOne(id)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Post()
    createAdmin(@Body() newAdmin: AdminDto): Promise<Admin> {
        return this.adminService.create(newAdmin)
        .catch(error => {
            throw new HttpException(error.message, error.status);
        });
    }

    @Put(':id')
    updateAdmin(@Param('id') id: string, @Body() admin: AdminDto): Promise<Admin> {
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