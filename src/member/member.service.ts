import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import path from 'path';
import * as  bcrypt from 'bcryptjs'
import { Member } from 'src/entities/member';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUpMember.dto';
import { Category } from 'src/entities/category';
import { SignInDto } from './dto/signInMember.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,

        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) { }

    async signUp(signUpData: SignUpDto, avatar: Express.Multer.File): Promise<{ message: string }> {
        const { fullName, email, password, favoriteCategory } = signUpData;
        const existingMember = await this.memberRepository.findOne({ where: { email } });
        if (existingMember) {
            throw new NotFoundException('Email is already in use');
        }

        const category = await this.categoryRepository.findOne({
            where: {
                id: favoriteCategory
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        const newMember = this.memberRepository.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            favoriteCategory: category,
            avatarName: avatar.filename,
        });

        try {
            await this.memberRepository.save(newMember);

            return { message: "Sign-up success" };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create member');
        }
    }

    async signIn(signInData: SignInDto): Promise<{ message: string, jwtToken: string }> {
        const { email, password } = signInData;
        const member = await this.memberRepository.findOne({
            where: {
                email: email
            }
        });
        if (!member) {
            throw new NotFoundException('Email not found');
        }
        const doesPasswordMatch = await bcrypt.compare(password, member.password);
        if (!doesPasswordMatch) {
            throw new UnauthorizedException('Password does not match');
        }

        const token = this.generateToken(member.id)


        return { message: "Sign-in success", jwtToken: token };
    }

    async findId(id: number): Promise<Member> {
        try {
            const result = this.memberRepository.findOne({
                where: {
                    id: id
                }
            })

            return result
        } catch (error) {
            throw new NotFoundException("failed to get member")
        }
    }

    async editProfile(memberId: number, editProfileData: EditProfileDto, avatar: Express.Multer.File, removeAvatar: boolean): Promise<{ message: string }> {
        const member = await this.memberRepository.findOne({
            where: {
                id: memberId
            }
        });
        if (!member) {
            throw new NotFoundException('Member not found');
        }

        const { email } = editProfileData;
        if (email && email !== member.email) {
            const existingEmail = await this.memberRepository.findOne({ where: { email: email } });
            if (existingEmail) {
                throw new ConflictException('Email is already in use');
            }
        }

        if (removeAvatar && !member.avatarName) {
            removeAvatar = false;
        }


        if (avatar && removeAvatar) {
            throw new BadRequestException('Do not upload a new avatar if you are removing the old one');
        }


        if (avatar && !removeAvatar) {
            editProfileData.avatarName = avatar.filename;

            if (member.avatarName) {
                await fs.promises.unlink(
                    path.resolve('public', 'uploads', 'member', member.avatarName)
                );
            }
        } else if (!avatar && removeAvatar) {

            delete editProfileData.avatarName;
        }

        try {

            const updateResult = await this.memberRepository.update(memberId, editProfileData);
            if (updateResult.affected === 0) {
                throw new NotFoundException('Member not found');
            }

            return { message: "Profile edited" };
        } catch (error) {
            throw new InternalServerErrorException('Failed to edit profile');
        }
    }


    private generateToken(id: number): string {
        const dataToken = { id };
        const secret = this.configService.get<string>('MEMBER_JWT_SECRET');
        const token = this.jwtService.sign(dataToken, { secret });
        return token;
    }
}