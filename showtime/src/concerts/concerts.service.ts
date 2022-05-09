import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Concert } from './entities/concert.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) {}

  async create(newConcert: CreateConcertDto): Promise<any> {
    return await this.concertsRepository.save(newConcert);
  }

  update(data: Partial<UpdateConcertDto>, id: number): Promise<UpdateResult> {
    return this.concertsRepository.update({ id }, data);
  }

  findAll(): Promise<Concert[]> {
    return this.concertsRepository.find();
  }

  findOneById(id: number): Promise<Concert> {
    return this.concertsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.concertsRepository.delete(id);
  }
  searchConcerts(concert: string) {
    console.log(concert);
    return this.concertsRepository
      .createQueryBuilder()
      .select()
      .where('title LIKE :searchQuery', { searchQuery: `%${concert}%` })
      .orWhere('place LIKE :searchQuery', {
        searchQuery: `%${concert}%`,
      })
      .getMany();
  }
}
