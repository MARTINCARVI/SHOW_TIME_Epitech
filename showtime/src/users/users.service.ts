import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Concert } from 'src/concerts/entities/concert.entity';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}
  async create(newUser: CreateUserDto | RegisterDto): Promise<any> {
    console.log(newUser);
    const entity = Object.assign(new User(), newUser);
    return await this.usersRepository.save(entity);
  }

  async update(
    data: Partial<UpdateUserDto>,
    id: number,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update({ id }, data);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['favoritesConcert'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async AddConcertToFavorite(dto, userId): Promise<any> {
    const concert = await this.concertsRepository.findOne({ id: dto });
    const user = await this.usersRepository.findOne(
      { id: userId },
      {
        relations: ['favoritesConcert'],
      },
    );
    user.favoritesConcert.push(concert);
    return this.usersRepository.save(user);
  }

  async AddGroupToFavorite(dto, userId): Promise<any> {
    const group = await this.groupsRepository.findOne({ id: dto });
    const user = await this.usersRepository.findOne(
      { id: userId },
      {
        relations: ['favoritesGroup'],
      },
    );
    user.favoritesGroup.push(group);
    return this.usersRepository.save(user);
  }
}
