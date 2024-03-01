import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findId(id);
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name, description } = createCategoryDto;
        return this.categoryService.create(name, description);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const { name, description } = updateCategoryDto;
        return this.categoryService.update(id, name, description);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Category> {
        return this.categoryService.delete(id);
    }
}