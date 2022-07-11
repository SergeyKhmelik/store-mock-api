import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';

@ApiBearerAuth()
@ApiExcludeController() // removing categories for now
@ApiTags('Item categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto) as unknown as Promise<Category>;
  }

  @Get()
  findAll() {
    return this.categoryService.findAll() as unknown as Promise<Category[]>;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id) as unknown as Promise<Category>;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto) as unknown as Promise<Category>;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id) as unknown as Promise<Category>;
  }
}
