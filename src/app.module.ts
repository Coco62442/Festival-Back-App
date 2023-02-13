import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenevoleModule } from './Benevole/benevole.module';
import { JeuModule } from './Jeu/jeu.module';
import { ZoneModule } from './Zone/zone.module';
import { AffectationModule } from './Affectation/affectation.module';
import { AuthModule } from './Authentification/auth.module';
import { AdminModule } from './Admin/admin.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@festivalcluster.iv7ihff.mongodb.net/Festival?retryWrites=true&w=majority'),
    BenevoleModule, AdminModule, JeuModule, ZoneModule, AffectationModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}