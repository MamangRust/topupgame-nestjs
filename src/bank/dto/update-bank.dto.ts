import { IsOptional, IsString } from 'class-validator';

export class UpdateBankDto {
    @IsOptional()
    @IsString()
    account_name: string;

    @IsOptional()
    @IsString()
    bank_name: string;

    @IsOptional()
    @IsString()
    no_rekening: string;
}