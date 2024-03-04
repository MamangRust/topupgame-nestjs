import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ description: 'User password', example: 'password123' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}
