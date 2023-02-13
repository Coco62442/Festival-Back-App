import { HttpException, Injectable } from '@nestjs/common';
import { BenevoleDto } from 'src/Benevole/BenevoleDTO/benevole.dto';
import { BenevoleService } from '../Benevole/benevole.service';
import { AdminService } from 'src/Admin/admin.service';
import { BenevoleReturn } from 'src/Benevole/BenevoleDTO/benevoleReturn';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from 'src/Admin/AdminDTO/admin.dto';
import { AdminReturn } from 'src/Admin/AdminDTO/adminReturn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly benevoleService: BenevoleService,
    private readonly adminService: AdminService,
    private jwtService: JwtService) {}

  async register(userData: AdminDto): Promise<AdminReturn> {
    const {mailAdmin, mdpAdmin} = userData;

    // TODO: Change this secret
    const salt = await bcrypt.genSalt(10);
    userData.mdpAdmin = await bcrypt.hash(mdpAdmin, salt);
    return await this.adminService.create(userData)
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  async login(email: string, mdp: string): Promise<{token: string}> {
    // TODO: Change this secret
    
    return await this.adminService.verifLogin(email, mdp)
    .then(async admin => {
      const payload = {
        admin: admin
      }
      const jwt = await this.jwtService.sign(payload);
      return {
        token: jwt
      };
    })
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}