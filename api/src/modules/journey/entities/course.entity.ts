import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  institution: string;

  @Column({ type: 'date' })
  completionDate: Date;

  @Column({ nullable: true })
  certificateUrl?: string;
}