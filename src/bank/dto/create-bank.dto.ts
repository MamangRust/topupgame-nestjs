import { IsNotEmpty, IsString } from "class-validator";


export class CreateBankDto {
    @IsNotEmpty()
    @IsString()
    account_name: string;

    @IsNotEmpty()
    @IsString()
    bank_name: string;

    @IsNotEmpty()
    @IsString()
    no_rekening: string;
}