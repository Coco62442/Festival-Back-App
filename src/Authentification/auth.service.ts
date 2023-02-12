import { HttpException, Injectable } from '@nestjs/common';
import { BenevoleDto } from 'src/Benevole/BenevoleDTO/benevole.dto';
import { Benevole } from 'src/Benevole/Schema/benevole.schema';
import { BenevoleService } from '../Benevole/benevole.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly benevoleService: BenevoleService,
    private jwtService: JwtService) {}

  async register(userData: BenevoleDto): Promise<Partial<Benevole>> {
    const {emailBenevole, mdpBenevole} = userData;

    // TODO: Change this secret
    const salt = await bcrypt.genSalt(10);
    userData.mdpBenevole = await bcrypt.hash(mdpBenevole, salt);
    return await this.benevoleService.create(userData)
    .then(benevole => {
      const result = {
        nomBenevole: benevole.nomBenevole,
        prenomBenevole: benevole.prenomBenevole,
        emailBenevole: benevole.emailBenevole,
        telBenevole: benevole.telBenevole,
        description: benevole.description
      }
      return result
    })
    .catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }

  async login(email: string, mdp: string) {
    // TODO: Change this secret
    const salt = await bcrypt.genSalt(10)
    mdp = await bcrypt.hash(mdp, salt)

    return await this.benevoleService.verifLogin(email, mdp)
    .then(async benevole => {
      const payload = {
        benevole: benevole
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