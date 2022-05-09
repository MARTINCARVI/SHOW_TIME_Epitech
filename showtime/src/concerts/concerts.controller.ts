import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Response } from 'express';
import { Concert } from './entities/concert.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('concerts')
@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Post('/')
  async createConcert(@Body() createConcertDto: CreateConcertDto) {
    return await this.concertsService.create(createConcertDto);
  }

  @Get('/')
  async getAllConcerts(@Res() res: Response) {
    try {
      const concerts: Concert[] = await this.concertsService.findAll();
      res.status(200).send(concerts);
    } catch (e) {
      res
        .status(400)
        .send({ error: { message: e.message || null, ...e.errors } });
    }
  }
  @Get('/search')
  async searchConcerts(@Query('search') concert: string) {
    return await this.concertsService.searchConcerts(concert);
  }
  @Get('/:id')
  async getOneConcert(@Param('id') id): Promise<Concert> {
    return await this.concertsService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<UpdateConcertDto>,
  ) {
    return await this.concertsService.update(data, id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.concertsService.remove(id);
  }
}
