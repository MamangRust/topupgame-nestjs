import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NominalService } from './nominal.service';
import { Nominal } from 'src/entities/nominal';
import { CreateNominalDto } from './dto/create-nominal.dto';
import { UpdateNominalDto } from './dto/update-nominal.dto';

@Controller('nominals')
export class NominalController {
    constructor(private readonly nominalService: NominalService) { }

    @Get()
    async findAll(): Promise<Nominal[]> {
        return this.nominalService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Nominal> {
        return this.nominalService.findId(id);
    }

    @Post()
    async create(@Body() createNominalDto: CreateNominalDto): Promise<Nominal> {
        const { coin_name, coin_quantity, price, description } = createNominalDto;
        return this.nominalService.create(coin_name, coin_quantity, price, description);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateNominalDto: UpdateNominalDto): Promise<Nominal> {
        const { coin_name, coin_quantity, price, description } = updateNominalDto;
        return this.nominalService.update(id, coin_name, coin_quantity, price, description);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Nominal> {
        return this.nominalService.delete(id);
    }
}
