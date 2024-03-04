import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class CreateNominalDto {
    @ApiProperty({ description: 'The name of the nominal', type: String })
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name should be a string' })
    name: string;

    @ApiProperty({ description: 'The quantity of the nominal', type: Number })
    @IsNotEmpty({ message: 'Quantity should not be empty' })
    @IsNumber({}, { message: 'Quantity should be a number' })
    @Min(0, { message: 'Quantity should be greater than or equal to 0' })
    quantity: number;

    @ApiProperty({ description: 'The price of the nominal', type: Number })
    @IsNotEmpty({ message: 'Price should not be empty' })
    @IsNumber({}, { message: 'Price should be a number' })
    @Min(0, { message: 'Price should be greater than or equal to 0' })
    price: number;
}