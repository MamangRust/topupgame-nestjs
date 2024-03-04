import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ArrayMinSize, IsArray, IsOptional } from 'class-validator';

export class UpdateVoucherDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the voucher' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Category ID of the voucher' })
    categoryId: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty({ description: 'Array of nominal IDs associated with the voucher' })
    nominalIds: number[];

    @ApiProperty({ required: false, type: 'string', format: 'binary', description: 'Image file for the voucher' })
    image: any;
}