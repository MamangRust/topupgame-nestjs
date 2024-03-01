import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNominalDto {
    @IsOptional()
    @IsString()
    coin_name: string;

    @IsOptional()
    @IsNumber()
    coin_quantity: number;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description: string;
}
