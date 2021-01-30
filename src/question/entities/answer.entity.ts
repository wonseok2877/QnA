import { IsString } from 'class-validator';
import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; // 생성일

  @UpdateDateColumn()
  updatedAt: Date; // 수정일

  @Column()
  @IsString()
  result: String; // 답변

  @Column()
  @IsString()
  user: String; // 사용자

  @ManyToOne((type) => Question, (question) => question.answer, { eager: true })
  @JoinTable()
  question: Question;
}
