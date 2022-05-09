import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  username: string;
  picture: string;
  group_id: number[];
  concert_id: number[];
  isAdmin: number;
}
