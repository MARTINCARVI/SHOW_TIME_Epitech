import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  cover_picture: string;

  @Column()
  category_id: number;

  @ManyToMany(() => User, (user) => user.favoritesGroup)
  groupfans: User[];
}
