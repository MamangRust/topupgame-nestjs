import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { Voucher } from 'src/entities/voucher';
import { MemberGuard } from 'src/member/guard/member.guard';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { JwtGuard } from 'src/admin/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) { }

    @UseGuards(MemberGuard)
    @Get('/ids')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return IDs of all vouchers', type: [String] })
    async getVoucherIds(): Promise<number[]> {
        const voucherIds = await this.voucherService.getVoucherIds();

        return voucherIds;
    }

    @UseGuards(MemberGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return a voucher by ID', type: Voucher })
    @ApiResponse({ status: 404, description: 'Voucher not found' })
    async getVoucher(@Param('id', ParseIntPipe) id: number): Promise<Voucher> {
        const voucher = await this.voucherService.getVoucher(id);

        return voucher;
    }

    // admin


    @UseGuards(JwtGuard)
    @Get('')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return a vouchers', type: [Voucher] })
    async findVouchers(): Promise<Voucher[]> {
        return await this.voucherService.findAll();
    }


    @UseGuards(JwtGuard)
    @Post('/create')
    @UseInterceptors(FileInterceptor('image'))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Create a new voucher',
        type: CreateVoucherDto,
    })
    @ApiResponse({ status: 201, description: 'Voucher created' })
    async create(
        @Body() createVoucherDto: CreateVoucherDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ]
            })
        ) image: Express.Multer.File,
    ): Promise<void> {
        return this.voucherService.create(createVoucherDto, image);
    }

    @UseGuards(JwtGuard)
    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Voucher ID' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Update an existing voucher',
        type: UpdateVoucherDto,
    })
    @ApiResponse({ status: 200, description: 'Voucher updated' })
    @ApiResponse({ status: 404, description: 'Voucher not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateVoucherDto: UpdateVoucherDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ]
            })
        ) image: Express.Multer.File,
    ): Promise<void> {
        return this.voucherService.update(id, updateVoucherDto, image);
    }

    @UseGuards(JwtGuard)
    @Delete('/delete/:id')
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number', description: 'Voucher ID' })
    @ApiResponse({ status: 200, description: 'Voucher deleted' })
    @ApiResponse({ status: 404, description: 'Voucher not found' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.voucherService.delete(id);
    }
}