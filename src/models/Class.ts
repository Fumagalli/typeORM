/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import Lesson from './Lesson';

@Entity()
export default class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
    nullable: false,
  })
  @MaxLength(45, {
    message: 'Name é muito grande',
  })
  name: string;

  @Column()
  duration: number;

  @OneToMany(type => Lesson, classe => Class)
  lesson: Lesson[];

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;
}
