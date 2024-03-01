import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async findAll(): Promise<Category[]> {
    try {
      const result = this.categoryRepository.find({
        take: 10
      })

      return result
    } catch (error) {
      throw new Error("failed get categories: " + error)
    }
  }

  async findId(id: string): Promise<Category> {
    try {
      const result = this.categoryRepository.findOne({
        where: {
          category_id: id
        }
      })

      return result
    } catch (error) {
      throw new Error("failed to get category: " + error)
    }
  }

  async create(name: string, description: string): Promise<Category> {
    try {
      const result = this.categoryRepository.findOne({
        where: {
          name: name
        }
      })

      if (result) {
        throw new Error("Category with the provided name already exists.")
      }

      const create = this.categoryRepository.create({
        name: name,
        description: description
      })

      this.categoryRepository.save(create)

      return create
    } catch (error) {
      throw new Error('failed to create category: ' + error)
    }
  }

  async update(id: string, name: string, description: string): Promise<Category> {
    try {
      const result = await this.categoryRepository.findOne({
        where: {
          category_id: id
        }
      })

      if (!result) {
        throw new Error("Category not found with the provided ID.");
      }

      result.name = name;
      result.description = description

      this.categoryRepository.save(result)

      return result;
    } catch (error) {
      throw new Error('failed to update category: ' + error)
    }
  }

  async delete(id: string): Promise<Category> {
    try {
      const result = await this.categoryRepository.findOne({
        where: {
          category_id: id
        }
      });


      if (!result) {
        throw new Error("Category not found with the provided ID.");
      }

      this.categoryRepository.remove(result)

      return result
    } catch (error) {
      throw new Error("failed to delete category: " + error)
    }
  }
}
