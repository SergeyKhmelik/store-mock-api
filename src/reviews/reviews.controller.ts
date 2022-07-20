import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../authentication/decorators/public.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { SimpleUser } from '../users/dto/simple-user.dto';

@ApiTags('Reviews')
@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Param('productId') productId: string, @Body() createReviewDto: CreateReviewDto, @Request() req) {
    const requestUser = req.user as SimpleUser;
    return this.reviewsService.create(createReviewDto, productId, requestUser);
  }

  @Public()
  @Get()
  findAll(@Param('productId') productId: string) {
    return this.reviewsService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('productId') productId: string, @Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('productId') productId: string,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req,
  ) {
    const requestUser = req.user as SimpleUser;
    return this.reviewsService.update(id, updateReviewDto, productId, requestUser);
  }

  @Delete(':id')
  remove(@Param('productId') productId: string, @Param('id') id: string, @Request() req) {
    const requestUser = req.user as SimpleUser;
    return this.reviewsService.remove(productId, id, requestUser);
  }
}
