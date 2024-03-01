import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { Bank } from 'src/entities/bank';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('banks')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @Get()
    async findAll(): Promise<Bank[]> {
        return this.bankService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Bank> {
        return this.bankService.findId(id);
    }

    @Post()
    async create(@Body() createBankDto: CreateBankDto): Promise<Bank> {
        const { account_name, bank_name, no_rekening } = createBankDto;
        return this.bankService.create(account_name, bank_name, no_rekening);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto): Promise<Bank> {
        const { account_name, bank_name, no_rekening } = updateBankDto;
        return this.bankService.update(id, account_name, bank_name, no_rekening);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Bank> {
        return this.bankService.delete(id);
    }
}