import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(newCategory: CreateCategoryDto): Promise<any> {
    return await this.categoriesRepository.save(newCategory);
  }

  update(data: Partial<UpdateCategoryDto>, id: number): Promise<UpdateResult> {
    return this.categoriesRepository.update({ id }, data);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOneById(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
