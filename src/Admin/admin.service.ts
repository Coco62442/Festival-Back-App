import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './Schema/admin.schema';
import { AdminDto } from './AdminDTO/admin.dto';
import { validate, ValidationError } from 'class-validator';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}
  
    async create(createAdminDto: AdminDto): Promise<Admin> {
        const createdAdmin = new this.adminModel(createAdminDto);

        const errors: ValidationError[] = await validate(createdAdmin);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        return createdAdmin.save()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, admin: AdminDto): Promise<Admin> {
        const adminToUpdate = new this.adminModel(admin);

        const errors: ValidationError[] = await validate(adminToUpdate);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        await this.adminModel.updateOne({ _id: id }, adminToUpdate)
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        });

        return await this.adminModel.findById(id).exec()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async delete(id: string): Promise<void> {
        this.adminModel.deleteOne({ _id: id }).exec()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async findAll(): Promise<Admin[]> {
        return this.adminModel.find().exec()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async findOne(id: string): Promise<Admin> {
        return this.adminModel.findById(id).exec()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}