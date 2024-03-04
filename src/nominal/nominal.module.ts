import { Module } from '@nestjs/common';
import { NominalController } from './nominal.controller';
import { NominalService } from './nominal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nominal } from 'src/entities/nominal';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nominal])
  ],
  controllers: [NominalController],
  providers: [NominalService]
})
export class NominalModule { }
