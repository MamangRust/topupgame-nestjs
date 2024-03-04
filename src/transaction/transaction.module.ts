import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction';
import { Voucher } from 'src/entities/voucher';
import { Nominal } from 'src/entities/nominal';
import { PaymentMethod } from 'src/entities/payment_method';
import { Bank } from 'src/entities/bank';
import { Member } from 'src/entities/member';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Voucher, Nominal, PaymentMethod, Bank, Member])
  ],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule { }
