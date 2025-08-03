import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  iconName: string;

  @Column('text')
  description: string;
}