import { Group } from 'src/groups/entities/group.entity';
import { Concert } from 'src/concerts/entities/concert.entity';
import * as bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt');
import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  group_id: number[];

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  concert_id: number[];

  @Column({ default: 0 })
  isAdmin: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    nullable: true,
  })
  created_at: Date;

  @ManyToMany(() => Group, (group) => group.groupfans, { cascade: true })
  @JoinTable()
  favoritesGroup: Group[];

  @ManyToMany(() => Concert, (concert) => concert.concertfans, {
    cascade: true,
  })
  @JoinTable()
  favoritesConcert: Concert[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
