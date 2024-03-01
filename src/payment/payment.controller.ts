import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMethod } from 'src/entities/paymentmethod';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PaymentMethod> {
        return this.paymentService.findId(id);
    }

    @Post()
    async create(@Body() data: Partial<PaymentMethod>): Promise<PaymentMethod> {
        return this.paymentService.createPayment(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any): Promise<PaymentMethod> {
        return this.paymentService.updatePayment(id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<PaymentMethod> {
        return this.paymentService.deletePayment(id);
    }
}