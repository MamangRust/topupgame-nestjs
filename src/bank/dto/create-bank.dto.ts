import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
    @ApiProperty({ description: 'Bank name', example: 'Example Bank' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @ApiProperty({ description: 'Account holder name', example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    holderName: string;

    @ApiProperty({ description: 'Account holder numbers', example: '1234567890' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    holderNumbers: string;
}

