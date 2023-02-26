import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

/*
async function bootstrap() {
  var cors = require('cors');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.use(cors({
    origin: ['http://localhost:3001/zones', 'http://localhost:3001'] // Autorise les requêtes de http://example.com et http://localhost:3000
  }));
}
bootstrap();
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // Ajouter le middleware CORS ici
  app.use(cors({
    origin: 'http://localhost:3001' // Permet uniquement les requêtes de http://localhost:3001
  }));
  
  await app.listen(3000);
}
bootstrap();