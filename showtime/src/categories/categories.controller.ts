import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    // console.log("dtocategorie", createCategoryDto);
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get('/')
  async getAllCategories(@Res() res: Response) {
    try {
      const categories: Category[] = await this.categoriesService.findAll();
      res.status(200).send(categories);
    } catch (e) {
      res
        .status(400)
        .send({ error: { message: e.message || null, ...e.errors } });
    }
  }

  @Get('/:id')
  async getOneCategory(@Param('id') id): Promise<Category> {
    return await this.categoriesService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<UpdateCategoryDto>,
  ) {
    return await this.categoriesService.update(data, id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
