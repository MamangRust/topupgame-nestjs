import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NominalService } from './nominal.service';
import { Nominal } from 'src/entities/nominal';
import { CreateNominalDto } from './dto/create-nominal.dto';
import { UpdateNominalDto } from './dto/update-nominal.dto';
import { JwtGuard } from 'src/admin/guard/jwt.guard';

@UseGuards(JwtGuard)
@ApiTags('Nominals')
@Controller('nominals')
export class NominalController {
    constructor(private readonly nominalService: NominalService) { }

    @ApiOperation({ summary: 'Get all nominals' })
    @ApiOkResponse({ description: 'List of all nominals', type: Nominal, isArray: true })
    @Get()
    async findAll(): Promise<Nominal[]> {
        return this.nominalService.findAll();
    }

    @ApiOperation({ summary: 'Get a nominal by ID' })
    @ApiOkResponse({ description: 'The nominal', type: Nominal })
    @ApiNotFoundResponse({ description: 'Nominal not found' })
    @ApiBadRequestResponse({ description: 'Invalid ID format' })
    @ApiParam({ name: 'id', description: 'Nominal ID', type: 'integer' })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Nominal> {
        const nominal = await this.nominalService.findOne(id);

        return nominal;
    }

    @ApiOperation({ summary: 'Create a new nominal' })
    @ApiCreatedResponse({ description: 'The created nominal', type: Nominal })
    @ApiBadRequestResponse({ description: 'Invalid data format' })
    @Post()
    async create(@Body() createNominalDto: CreateNominalDto): Promise<Nominal> {
        return this.nominalService.create(createNominalDto);
    }

    @ApiOperation({ summary: 'Update a nominal by ID' })
    @ApiOkResponse({ description: 'The updated nominal', type: Nominal })
    @ApiNotFoundResponse({ description: 'Nominal not found' })
    @ApiBadRequestResponse({ description: 'Invalid ID format or data format' })
    @ApiParam({ name: 'id', description: 'Nominal ID', type: 'integer' })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateNominalDto: UpdateNominalDto,
    ): Promise<Nominal> {
        return this.nominalService.update(id, updateNominalDto);
    }

    @ApiOperation({ summary: 'Delete a nominal by ID' })
    @ApiOkResponse({ description: 'Nominal deleted successfully' })
    @ApiNotFoundResponse({ description: 'Nominal not found' })
    @ApiBadRequestResponse({ description: 'Invalid ID format' })
    @ApiParam({ name: 'id', description: 'Nominal ID', type: 'integer' })
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.nominalService.remove(id);
    }
}
