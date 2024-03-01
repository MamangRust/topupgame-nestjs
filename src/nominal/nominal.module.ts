import { Module } from '@nestjs/common';
import { NominalController } from './nominal.controller';
import { NominalService } from './nominal.service';

@Module({
  controllers: [NominalController],
  providers: [NominalService]
})
export class NominalModule {}
