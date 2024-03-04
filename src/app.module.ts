import { Module } from '@nestjs/common';
import { BankModule } from './bank/bank.module';
import { CategoryModule } from './category/category.module';
import { NominalModule } from './nominal/nominal.module';
import { PaymentModule } from './payment/payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { VoucherModule } from './voucher/voucher.module';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/admin';
import { Bank } from './entities/bank';
import { Category } from './entities/category';
import { Member } from './entities/member';
import { Nominal } from './entities/nominal';
import { PaymentMethod } from './entities/payment_method';
import { Transaction } from './entities/transaction';
import { Voucher } from './entities/voucher';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'public',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Administrator, Bank, Category, Member, Nominal, PaymentMethod, Transaction, Voucher],
      synchronize: true,
    }),
    BankModule, CategoryModule, NominalModule, PaymentModule, TransactionModule, VoucherModule, AdminModule, MemberModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
