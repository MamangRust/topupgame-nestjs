import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty({ message: 'Full name cannot be empty' })
    @IsString({ message: 'Full name must be a string' })
    fullName: string;

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(255, { message: 'Password cannot be longer than 255 characters' })
    password: string;

    @IsNotEmpty({ message: 'Favorite category cannot be empty' })
    @IsNumber({ maxDecimalPlaces: 30 })
    favoriteCategory: number;

    @ApiProperty({ required: true, type: 'string', format: 'binary' })
    avatar: any;

}