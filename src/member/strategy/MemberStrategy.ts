import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MemberService } from '../member.service';


@Injectable()
export class MemberStrategy extends PassportStrategy(Strategy) {
    constructor(
        private memberService: MemberService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('MEMBER_JWT_SECRET'),
        });
    }

    async validate(payload: any) {

        let member = await this.memberService.findId(payload.id);
        if (!member) {
            throw new UnauthorizedException();
        }


        return member;
    }


}