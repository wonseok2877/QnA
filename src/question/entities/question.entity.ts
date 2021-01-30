import { IsString } from 'class-validator';
import { Answer } from 'src/question/entities/answer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; // 생성일

  @UpdateDateColumn()
  updatedAt: Date; // 수정일

  @Column()
  @IsString()
  contents: String;

  @OneToMany((type) => Answer, (answer) => answer.question)
  answer: Answer[];
}
