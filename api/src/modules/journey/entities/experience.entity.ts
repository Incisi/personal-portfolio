import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column()
  period: string;

  @Column('simple-array')
  description: string[];

  @Column({ type: 'int', default: 0 })
  order: number;
}