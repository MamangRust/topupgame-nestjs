import { IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBankDto {
    @ApiPropertyOptional({ description: 'Bank name', example: 'Updated Bank' })
    @IsString()
    @MaxLength(255)
    name?: string;

    @ApiPropertyOptional({ description: 'Account holder name', example: 'John Doe' })
    @IsString()
    @MaxLength(255)
    holderName?: string;

    @ApiPropertyOptional({ description: 'Account holder numbers', example: '1234567890' })
    @IsString()
    @MaxLength(20)
    holderNumbers?: string;
}
