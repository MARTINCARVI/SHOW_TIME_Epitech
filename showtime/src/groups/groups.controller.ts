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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Response } from 'express';
import { Group } from './entities/group.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('/')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(createGroupDto);
  }

  @Get('/')
  async getAllGroups(@Res() res: Response) {
    try {
      const groups: Group[] = await this.groupsService.findAll();
      res.status(200).send(groups);
    } catch (e) {
      res
        .status(400)
        .send({ error: { message: e.message || null, ...e.errors } });
    }
  }

  @Get('/:id')
  async getOneGroup(@Param('id') id): Promise<Group> {
    return await this.groupsService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<UpdateGroupDto>) {
    return await this.groupsService.update(data, id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }
}
