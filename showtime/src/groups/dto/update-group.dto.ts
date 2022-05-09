import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  name: string;
  description: string;
  cover_picture: string;
  category_id: number;
}
