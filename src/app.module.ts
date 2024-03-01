import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
import { CategoryModule } from './category/category.module';
import { NominalModule } from './nominal/nominal.module';
import { PaymentModule } from './payment/payment.module';
import { PlayerModule } from './player/player.module';
import { TransactionModule } from './transaction/transaction.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [UserModule, BankModule, CategoryModule, NominalModule, PaymentModule, PlayerModule, TransactionModule, VoucherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
