/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import Lesson from './Lesson';

@Entity()
export default class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  @MaxLength(100, {
    message: 'Description muito grande, máximo de 100 caracteres',
  })
  description: string;

  @Column({
    length: 45,
  })
  @MaxLength(45, {
    message: 'LinkContent muito grande, máximo de 45 caracteres',
  })
  linkContent: string;

  @ManyToOne(type => Lesson, content => Content, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  lesson: Lesson;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;
}
