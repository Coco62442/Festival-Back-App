import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Affectation, AffectationDocument } from './Schema/affectation.schema';
import { AffectationDto } from './AffectationDTO/affectation.dto';
import { Benevole, BenevoleDocument } from 'src/Benevole/Schema/benevole.schema';
import { validate, ValidationError } from 'class-validator';
import { AffectationBenevolesDto } from './AffectationDTO/AffectationBenevoles.dto';


@Injectable()
export class AffectationService {
  constructor(@InjectModel(Affectation.name) private affectationModel: Model<AffectationDocument>,
    @InjectModel(Benevole.name) private benevoleModel: Model<BenevoleDocument>) { }

  async create(CreateAffectationDto: AffectationDto): Promise<Affectation> {
    const createdAffectation = new this.affectationModel(CreateAffectationDto);

    const errors: ValidationError[] = await validate(createdAffectation);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
    return createdAffectation.save()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async update(id: string, affectation: AffectationDto): Promise<Affectation> {
    const affectationToUpdate = new this.affectationModel(affectation);

    const errors: ValidationError[] = await validate(affectationToUpdate);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const benevoles: Benevole[] = await (await this.affectationModel.findById(id)).benevoles;

    return this.affectationModel.findByIdAndUpdate(id, { ...affectation, benevoles }, { new: true }).exec()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    // let benevoles: Array<Benevole>;
    // await this.affectationModel.findById(id)
    // .then(affectation => {
    //   if (!affectation) {
    //     throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
    //   }
    //   benevoles = affectation.benevoles;
    // })
    // .catch(error => {
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // });

    // return this.affectationModel.findByIdAndUpdate(id, { ...affectation, benevoles }, { new: true }).exec()
    // .then(affectation => {
    //   if (!affectation) {
    //     throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
    //   }
    //   return affectation;
    // })
    // .catch(error => {
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // });
  }

  async delete(id: string): Promise<any> {
    return this.affectationModel.deleteOne({ _id: id }).exec()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll(): Promise<Affectation[]> {
    return this.affectationModel.find().exec();
  }

  async findOne(id: string): Promise<Affectation> {
    return this.affectationModel.findOne({ _id: id }).exec()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findByCreneau(creneau: string): Promise<Affectation[]> {
    return this.affectationModel.find({ heureDebut: creneau }).exec()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findByZone(idZone: string): Promise<Affectation[]> {
    return this.affectationModel.find({ zone: {_id: idZone} }).exec()
      .catch(error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async addBenevole(idAffectation: string, idBenevole: string): Promise<Affectation> {
    let affectation;
    try {
      affectation = await this.affectationModel.findById(idAffectation);
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }

      const benevoleToAdd = await this.benevoleModel.findById(idBenevole);
      if (!benevoleToAdd) {
        throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
      }

      affectation.benevoles.push(benevoleToAdd);
      await affectation.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return affectation;
  }

  async removeBenevole(idAffectation: string, idBenevole: string): Promise<Affectation> {
    let affectation;
    try {
      affectation = await this.affectationModel.findById(idAffectation);
      if (!affectation) {
        throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
      }

      const benevoleToDelete = await this.benevoleModel.findById(idBenevole);
      if (!benevoleToDelete) {
        throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
      }

      const updatedAffectation = await this.affectationModel.updateOne(
        { _id: idAffectation },
        { $pull: { benevoles: { _id: idBenevole } } }
      );

      if (updatedAffectation.modifiedCount === 0) {
        throw new HttpException('Affectation not updated', HttpStatus.NOT_FOUND);
      }

      affectation = await this.affectationModel.findById(idAffectation).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return affectation;
  }

  async removeBenevoles(data: [AffectationBenevolesDto]): Promise<Boolean> {
    try {
      await data.forEach(async (data) => {
        this.removeBenevole(data.affectation, data.benevole);
      });
      return true
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addBenevoles(data: [AffectationBenevolesDto]): Promise<Boolean> {
    try {
      await data.forEach(async (data) => {
        const affectation = await this.affectationModel.findById(data.affectation);
        if (!affectation) {
          throw new HttpException('Affectation not found', HttpStatus.NOT_FOUND);
        }

        const benevoleToAdd = await this.benevoleModel.findById(data.benevole);
        if (!benevoleToAdd) {
          throw new HttpException('Benevole not found', HttpStatus.NOT_FOUND);
        }

        affectation.benevoles.push(benevoleToAdd);
        await affectation.save();
      })
      return true
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}