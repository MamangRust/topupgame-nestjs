import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from 'src/entities/transaction';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberGuard } from 'src/member/guard/member.guard';
import { JwtGuard } from 'src/admin/guard/jwt.guard';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @UseGuards(MemberGuard)
    @Get('/client')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Returns transactions and total spent for the user', type: Transaction })
    @ApiResponse({ status: 404, description: 'Transactions not found' })
    async getTransactions(@Req() req): Promise<{ transactions: Transaction[], totalSpent: number }> {
        try {
            const { transactions, totalSpent } = await this.transactionService.getTransactions(req.user.id);
            return { transactions, totalSpent };
        } catch (error) {
            throw new NotFoundException('Transactions not found');
        }
    }

    @UseGuards(MemberGuard)
    @Post('/create')
    @ApiBearerAuth()
    @ApiBody({ type: CreateTransactionDto })
    @ApiResponse({ status: 201, description: 'Transaction created', type: Transaction })
    async create(@Req() req, @Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {

        return this.transactionService.addTransaction(createTransactionDto, req.user.id);
    }


    @UseGuards(MemberGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Transaction ID' })
    @ApiResponse({ status: 200, description: 'Return a transaction by ID', type: Transaction })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    async findOne(@Req() req, @Param('id', ParseIntPipe) id: number): Promise<Transaction> {
        const transaction = await this.transactionService.getTransaction(id, req.user.id);

        return transaction;
    }


    @UseGuards(MemberGuard)
    @Put(':id/confirm-payment')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Transaction ID' })
    @ApiResponse({ status: 200, description: 'Payment confirmed' })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    @ApiResponse({ status: 403, description: 'Payment already confirmed' })
    async confirmPayment(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.transactionService.confirmPayment(id);
    }


    // admin
    @UseGuards(JwtGuard)
    @Get()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all transactions', type: [Transaction] })
    async findAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }


    @UseGuards(JwtGuard)
    @Put(':id/accept')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Transaction ID' })
    @ApiResponse({ status: 200, description: 'Transaction accepted' })
    @ApiResponse({ status: 404, description: 'Transaction not found or cannot be accepted' })
    async acceptTransaction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.transactionService.acceptTransaction(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id/reject')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Transaction ID' })
    @ApiResponse({ status: 200, description: 'Transaction rejected' })
    @ApiResponse({ status: 404, description: 'Transaction not found or cannot be rejected' })
    async rejectTransaction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.transactionService.rejectTransaction(id);
    }

}
