import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questions: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answers: Repository<Answer>,
  ) {}

  async random() {
    try {
      const questions = await this.questions.find();

      const count = questions.length;
      const question = questions[Math.floor(count * Math.random())];

      if (question) {
        return {
          ok: true,
          question: {
            id: question.id,
            contents: question.contents,
          },
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: 'not found Question',
      };
    }
  }

  async createAnswer(id: number, result: string, user: string) {
    try {
      if (!id) {
        return {
          ok: false,
          error: 'not found Question Id',
        };
      }
      if (!result) {
        return {
          ok: false,
          error: 'not found answer',
        };
      }
      const question = await this.questions.findOne(id);

      if (!question) {
        return {
          ok: false,
          error: 'not found Question',
        };
      }
      const answer = this.answers.create({ result, question, user });

      await this.answers.save(answer);

      return {
        ok: true,
      };
    } catch (error) {}
  }

  // 사용자 모든 답변 및 질문 가져오기
  async getAll(user: string) {
    try {
      const list = await this.answers.find({
        where: {
          user,
        },
        order: {
          createdAt: 'DESC',
        },
        take: 5,
      });

      if (!list[0]) {
        return {
          ok: false,
          error: "not found user's answer",
        };
      }
      return {
        ok: true,
        list,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
