/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import Content from './Content';
import Class from './Class';

@Entity()
export default class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  @MaxLength(100, {
    message: 'Description muito grande, máximo de 100 caracteres',
  })
  description: string;

  @OneToMany(type => Content, lesson => Lesson)
  content: Content[];

  @ManyToOne(type => Class, lesson => Lesson, {
    eager: true,
  })
  classe: Class;

  @CreateDateColumn({ name: 'created_At' })
  created_At: Date;

  @UpdateDateColumn({ name: 'update_At' })
  update_At: Date;
}
