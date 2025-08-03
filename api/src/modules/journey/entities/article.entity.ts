import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  
  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}