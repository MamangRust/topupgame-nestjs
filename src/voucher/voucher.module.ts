import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher';
import { Category } from 'src/entities/category';
import { Nominal } from 'src/entities/nominal';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher, Category, Nominal]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./public/upload/voucher",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      })
    })
  ],
  controllers: [VoucherController],
  providers: [VoucherService]
})
export class VoucherModule { }
