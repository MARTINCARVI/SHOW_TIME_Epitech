import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Delete,
  Put,
  Body,
  Get,
  Param,
  Post,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<UpdateUserDto>) {
    return await this.usersService.update(data, id);
  }

  @Get('/')
  async getAllUsers(@Res() res: Response) {
    try {
      const users: User[] = await this.usersService.findAll();
      res.status(200).send(users);
    } catch (e) {
      res
        .status(400)
        .send({ error: { message: e.message || null, ...e.errors } });
    }
  }

  @Get('/:id')
  async getOneUser(@Param('id') id): Promise<User> {
    return await this.usersService.findUserByEmail(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/favorite/concert/:id')
  async AddConcertToFavorite(@Param('id') id, @Request() req) {
    console.log('requser', req.user);
    return await this.usersService.AddConcertToFavorite(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/favorite/group/:id')
  async AddGroupToFavorite(@Param('id') id, @Request() req) {
    console.log('requser', req.user);
    return await this.usersService.AddGroupToFavorite(id, req.user.userId);
  }
}
