import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benevole, BenevoleDocument } from 'src/Benevole/Schema/benevole.schema';
import { Admin, AdminDocument } from './Schema/admin.schema';
import { AdminDto } from './AdminDTO/admin.dto';
import { AdminReturn } from './AdminDTO/adminReturn.dto';
import { validate, ValidationError } from 'class-validator';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
        ) {}
  
    async create(createAdminDto: AdminDto): Promise<AdminReturn> {
        const createdAdmin = new this.adminModel(createAdminDto);

        const errors: ValidationError[] = await validate(createdAdmin);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        // if (this.benevoleModel.findOne({ mailBenevole: createdAdmin.mailAdmin }) != undefined) {
        //     throw new HttpException('Mail already used', HttpStatus.BAD_REQUEST);            
        // }

        return createdAdmin.save()
        .then(admin => {
            return {
                _id: admin._id,
                mailAdmin: admin.mailAdmin
            };
        })
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async update(id: string, admin: AdminDto): Promise<AdminReturn> {
        const adminToUpdate = new this.adminModel(admin);

        const errors: ValidationError[] = await validate(adminToUpdate);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        // if (this.benevoleModel.findOne({ mailBenevole: adminToUpdate.mailAdmin }) != undefined) {
        //     throw new HttpException('Mail already used', HttpStatus.BAD_REQUEST);            
        // }

        adminToUpdate._id = id;
        return await this.adminModel.findByIdAndUpdate(id, adminToUpdate, { new: true }).exec()
        .then(admin => {
            if (!admin) {
                throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
            }
            return {
                _id: admin._id,
                mailAdmin: admin.mailAdmin
            };
        })
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

    async findAll(): Promise<AdminReturn[]> {
        return this.adminModel.find().exec()
        .then(admins => {
            return admins.map(admin => {
                return {
                    _id: admin._id,
                    mailAdmin: admin.mailAdmin
                };
            });
        })
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async findOne(id: string): Promise<AdminReturn> {
        return this.adminModel.findById(id).exec()
        .then(admin => {
            if (!admin) {
                throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
            }
            return {
                _id: admin._id,
                mailAdmin: admin.mailAdmin
            };
        })
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async findOneByEmail(email: string): Promise<AdminReturn> {
        return this.adminModel.findOne({ emailAdmin: email }).exec()
        .then(admin => {
            if (!admin) {
                throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
            }
            return {
                _id: admin._id,
                mailAdmin: admin.mailAdmin
            };
        })
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async verifLogin(email: string, mdp: string): Promise<AdminReturn> {
        try {
            const admin = await this.adminModel.findOne({mailAdmin: email}).exec();
      
            if (!admin) {
              throw new HttpException('L\'identifiant ou le mot de passe est invalide', HttpStatus.NOT_FOUND);
            }
            const isPasswordValid = await bcrypt.compare(mdp, admin.mdpAdmin);
      
            if (!isPasswordValid) {
              throw new HttpException('L\'identifiant ou le mot de passe est invalide', HttpStatus.NOT_FOUND);
            }
            // TODO: décommenter lorsque admin sera bien implémenté
            // if (!benevole.valider) {
            //   throw new HttpException('Votre compte n\'a pas encore été validé', HttpStatus.UNAUTHORIZED);
            // }
            return {
                _id: admin._id,
                mailAdmin: admin.mailAdmin
            };
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }
}