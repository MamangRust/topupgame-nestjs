import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from 'src/entities/category';
import { MemberStrategy } from './strategy/MemberStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("MEMBER_JWT_SECRET")
      })
    }),
    TypeOrmModule.forFeature([Member, Category]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/upload/member',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  ],
  providers: [MemberService, MemberStrategy],
  controllers: [MemberController]
})
export class MemberModule { }
