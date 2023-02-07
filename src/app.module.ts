import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenevoleModule } from './Benevole/benevole.module';
import { JeuModule } from './Jeu/jeu.module';
import { ZoneModule } from './Zone/zone.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root@festivalcluster.iv7ihff.mongodb.net/?retryWrites=true&w=majority'),
  BenevoleModule, JeuModule, ZoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}