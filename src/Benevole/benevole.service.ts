import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Benevole, BenevoleDocument } from './Schema/benevole.schema';
import { BenevoleDto } from './BenevoleDTO/benevole.dto';
import { validate, ValidationError } from 'class-validator';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BenevoleService {
  constructor(@InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) {}

  async create(CreateBenevoleDto: BenevoleDto): Promise<Benevole> {
    const createdBenevole = new this.benevoleModel(CreateBenevoleDto);
    const errors: ValidationError[] = await validate(createdBenevole);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    try {
      return await createdBenevole.save()
      .then(benevole => {
        return benevole
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, benevole: BenevoleDto): Promise<Benevole> {
    // TODO : faire en sorte que l'update update seulement les champs qui ont été modifiés

    // Valider les données d'entrée
    const benevoleToUpdate = new this.benevoleModel(benevole);
    const errors: ValidationError[] = await validate(benevoleToUpdate);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  
    // Effectuer la mise à jour
    return await this.benevoleModel.findByIdAndUpdate(id, benevole, { new: true }).exec()
    .then(benevole => {
      if (!benevole) {
        throw new HttpException('Bénévole not found', HttpStatus.NOT_FOUND);
      }
      return benevole;
    })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });  
  }

  async delete(id: string): Promise<void> {
    this.benevoleModel.deleteOne({ _id: id }).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findAll(): Promise<Benevole[]> {
    // TODO : ajouter {valider: true}
    return this.benevoleModel.find({}, {mdpBenevole: 0}).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<Benevole> {
    return this.benevoleModel.findOne({ _id: id }).lean().exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async newBenevoles(): Promise<Benevole[]> {
    return this.benevoleModel.find({valider: false}, {mdpBenevole: 0}).exec()
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async validateBenevole(id: string): Promise<Benevole> {
    return await this.benevoleModel.findByIdAndUpdate(id, {valider: true}, {new: true}).exec()
    .then(benevole => {
      if (!benevole) {
        throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
      }
      return benevole;
    })
    .catch(error => {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async verifLogin(email: string, mdp: string) {
    try {
      const benevole = await this.benevoleModel.findOne({emailBenevole: email}).exec();

      if (!benevole) {
        throw new HttpException('L\'identifiant ou le mot de passe est invalide', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(mdp, benevole.mdpBenevole);

      if (!isPasswordValid) {
        throw new HttpException('L\'identifiant ou le mot de passe est invalide', HttpStatus.NOT_FOUND);
      }
      // TODO: décommenter lorsque admin sera bien implémenté
      // if (!benevole.valider) {
      //   throw new HttpException('Votre compte n\'a pas encore été validé', HttpStatus.UNAUTHORIZED);
      // }
      return {
        _id: benevole._id,
        nomBenevole: benevole.nomBenevole,
        prenomBenevole: benevole.prenomBenevole,
        emailBenevole: benevole.emailBenevole,
        valider: benevole.valider,
        telBenevole: benevole.telBenevole,
        description: benevole.description
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  
}