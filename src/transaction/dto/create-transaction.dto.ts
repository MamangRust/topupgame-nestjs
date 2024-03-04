import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
    @ApiProperty({ description: 'ID of the voucher', example: 1 })
    @IsNotEmpty({ message: 'Voucher ID must not be empty' })
    @IsInt({ message: 'Voucher ID must be an integer' })
    voucherId: number;

    @ApiProperty({ description: 'ID of the nominal', example: 1 })
    @IsNotEmpty({ message: 'Nominal ID must not be empty' })
    @IsInt({ message: 'Nominal ID must be an integer' })
    nominalId: number;

    @ApiProperty({ description: 'ID of the payment method', example: 1 })
    @IsNotEmpty({ message: 'Payment method ID must not be empty' })
    @IsInt({ message: 'Payment method ID must be an integer' })
    paymentMethodId: number;

    @ApiProperty({ description: 'ID of the bank', example: 1 })
    @IsNotEmpty({ message: 'Bank ID must not be empty' })
    @IsInt({ message: 'Bank ID must be an integer' })
    bankId: number;
}
