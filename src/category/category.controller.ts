import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/entities/category';
import { JwtGuard } from 'src/admin/guard/jwt.guard';


@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Retrieve all categories', type: Category, isArray: true })
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }


    @Get(':id')
    @ApiResponse({ status: 200, description: 'Retrieve a category by ID', type: Category })
    @ApiResponse({ status: 404, description: 'Category not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        const category = await this.categoryService.findOne(id);

        return category;
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Create a new category', type: Category })
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Update a category by ID', type: Category })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Delete a category by ID' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.categoryService.remove(id);
    }
}
