import { Module } from '@nestjs/common';
import { BenevoleModule } from 'src/Benevole/benevole.module';
import { AdminModule } from 'src/Admin/admin.module';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.controller';

@Module({
  imports: [AdminModule, BenevoleModule],
  controllers: [ConnectionController],
  providers: [ConnectionService]
})

export class JeuModule {}