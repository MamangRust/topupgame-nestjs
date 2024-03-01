import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateNominalDto {
    @IsNotEmpty()
    @IsString()
    coin_name: string;

    @IsNotEmpty()
    @IsNumber()
    coin_quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;
}