export class CreateUserDto {
  email: string;
  password: string;
  username: string;
  picture: string;
  group_id: number[];
  concert_id: number[];
  isAdmin: number;
  created_at: Date;
}
