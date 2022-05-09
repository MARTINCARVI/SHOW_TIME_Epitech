import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(newGroup: CreateGroupDto): Promise<any> {
    return await this.groupsRepository.save(newGroup);
  }

  update(data: Partial<UpdateGroupDto>, id: number): Promise<UpdateResult> {
    return this.groupsRepository.update({ id }, data);
  }

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  findOneById(id: number): Promise<Group> {
    return this.groupsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
