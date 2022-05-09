import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ fulltext: true })
  title: string;

  @Column()
  @Index({ fulltext: true })
  place: string;

  @Column()
  group_id: number;

  @Column()
  price: string;

  @Column()
  date: string;
  @ManyToMany(() => User, (user) => user.favoritesConcert)
  concertfans: User[];
}
