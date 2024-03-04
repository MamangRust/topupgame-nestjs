import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { Administrator } from 'src/entities/admin';
import PasswordHash from 'src/utils/hash'
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminResponseDto } from './dto/admin-response.dto';
import { AdminAuthResponseDto } from './dto/admin_auth.response.dto';

@Injectable()
export class AdminService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(Administrator) private adminRepository: Repository<Administrator>) { }

    async create(signUpDto: SignUpDto): Promise<AdminResponseDto> {
        const { fullName, email, password, retypePassword } = signUpDto;

        if (password !== retypePassword) {
            throw new BadRequestException('The retype password does not match with the password you entered');
        }

        const hashedPassword = await PasswordHash.hashPassword(password);

        const newAdmin = new Administrator();

        newAdmin.fullName = fullName;
        newAdmin.email = email;
        newAdmin.password = hashedPassword;

        const admin = await this.adminRepository.save(newAdmin);

        return new AdminResponseDto(admin.id, admin.fullName, admin.email);
    }

    async login(data: SignInDto): Promise<AdminAuthResponseDto> {
        const user = await this.adminRepository.findOne({
            where: {
                email: data.email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const validPassword = await PasswordHash.correctPassword(data.password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user.id);

        return new AdminAuthResponseDto(user.id, user.fullName, user.email, token);
    }

    async findId(id: number): Promise<AdminResponseDto> {
        try {
            const result = await this.adminRepository.findOne({
                where: {
                    id
                }
            });

            if (!result) {
                throw new NotFoundException('Administrator not found');
            }

            return new AdminResponseDto(result.id, result.fullName, result.email);
        } catch (error) {
            throw new NotFoundException('Administrator not found');
        }
    }

    private generateToken(id: number): string {
        const dataToken = { id };
        const secret = this.configService.get<string>('JWT_SECRET');
        const token = this.jwtService.sign(dataToken, { secret });
        return token;
    }
}
