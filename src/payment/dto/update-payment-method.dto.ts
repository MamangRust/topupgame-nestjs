import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ArrayNotEmpty, ArrayMinSize, IsOptional } from 'class-validator';


export class UpdatePaymentMethodDto {
    @ApiProperty({ description: 'The name of the payment method', type: String, required: false })
    @IsString({ message: 'Name should be a string' })
    name?: string;

    @ApiProperty({ description: 'Array of bank IDs associated with the payment method', type: [Number], required: false })
    @IsOptional()
    @IsNotEmpty({ message: 'Bank IDs should not be empty' })
    @ArrayNotEmpty({ message: 'Bank IDs should not be empty' })
    @ArrayMinSize(1, { message: 'At least one bank ID is required' })
    bankIds?: number[];
}