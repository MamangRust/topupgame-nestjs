import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from 'src/entities/payment_method';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberGuard } from 'src/member/guard/member.guard';
import { JwtGuard } from 'src/admin/guard/jwt.guard';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }


    @UseGuards(MemberGuard)
    @Get('/client')
    @ApiBearerAuth()
    @ApiOkResponse({ status: 200, description: 'Return all payment method in client', type: [PaymentMethod] })
    async getPaymentMethods(): Promise<PaymentMethod[]> {
        return this.paymentService.getPaymentMethods();
    }


    // admin
    @UseGuards(JwtGuard)
    @Get()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all payment methods', type: [PaymentMethod] })
    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiResponse({ status: 200, description: 'Return a payment method by ID', type: PaymentMethod })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentService.findOne(id);

        return paymentMethod;
    }

    @UseGuards(JwtGuard)
    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: CreatePaymentMethodDto })
    @ApiResponse({ status: 201, description: 'Payment method created', type: PaymentMethod })
    async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        return this.paymentService.create(createPaymentMethodDto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiBody({ type: UpdatePaymentMethodDto })
    @ApiResponse({ status: 200, description: 'Payment method updated', type: PaymentMethod })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
    ): Promise<PaymentMethod> {
        return this.paymentService.update(id, updatePaymentMethodDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Payment method ID' })
    @ApiResponse({ status: 204, description: 'Payment method deleted' })
    @ApiResponse({ status: 404, description: 'Payment method not found' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.paymentService.remove(id);
    }
}
