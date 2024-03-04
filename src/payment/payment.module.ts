import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/entities/payment_method';
import { Bank } from 'src/entities/bank';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethod, Bank])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule { }
