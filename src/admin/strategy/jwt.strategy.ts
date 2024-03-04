import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; import { AdminService } from '../admin.service';
;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private adminService: AdminService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        let user = await this.adminService.findId(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}