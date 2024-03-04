import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ description: 'User full name', example: 'John Doe' })
    @IsNotEmpty()
    @MaxLength(255)
    fullName: string;

    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password (min length: 6)', minLength: 6, example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string;

    @ApiProperty({ description: 'Retyped password (min length: 6)', minLength: 6, example: 'password123' })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    retypePassword: string;
}
