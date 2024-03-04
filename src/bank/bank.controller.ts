import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; // Import anotasi Swagger
import { BankService } from './bank.service';
import { Bank } from 'src/entities/bank';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { JwtGuard } from 'src/admin/guard/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Banks')
@Controller('banks')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @Get()
    @ApiOperation({ summary: 'Get all banks' })
    async findAll(): Promise<Bank[]> {
        return this.bankService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get bank by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bank ID' })
    async findOne(@Param('id') id: number): Promise<Bank> {
        return this.bankService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new bank' })
    @ApiBody({ type: CreateBankDto })
    async create(@Body() createBankDto: CreateBankDto): Promise<Bank> {
        return this.bankService.create(createBankDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update bank by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bank ID' })
    @ApiBody({ type: UpdateBankDto })
    async update(@Param('id') id: number, @Body() updateBankDto: UpdateBankDto): Promise<Bank> {
        return this.bankService.update(id, updateBankDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bank by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Bank ID' })
    async remove(@Param('id') id: number): Promise<void> {
        return this.bankService.remove(id);
    }
}
