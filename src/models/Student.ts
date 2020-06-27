/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MaxLength, IsEmail } from 'class-validator';
import Class from './Class';

@Entity()
export default class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
  })
  @MaxLength(45, {
    message: 'Name muito grande, máximo de 45 caracteres',
  })
  name: string;

  @Column({
    length: 45,
  })
  @MaxLength(45, {
    message: 'Key muito grande, máximo de 45 caracteres',
  })
  key: string;

  @Column()
  @IsEmail()
  email: string;

  @ManyToMany(type => Class)
  @JoinTable()
  classes: Class[];

  @CreateDateColumn({ name: 'created_At' })
  created_At: Date;

  @UpdateDateColumn({ name: 'update_At' })
  update_At: Date;
}
