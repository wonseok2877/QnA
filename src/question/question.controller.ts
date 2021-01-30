import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // 랜덤 질문 반환
  @Get('/random')
  random() {
    return this.questionService.random();
  }

  // 답변 저장
  @Post('/answer/:id')
  postAnswer(@Param('id') id: number, @Body() answer) {
    id = +id;
    return this.questionService.createAnswer(id, answer.result, answer.user);
  }

  // 사용자 모든 질문 답변 값 반환
  @Get('/all-answer/:user')
  getAll(@Param('user') user: string) {
    console.log(user);

    return this.questionService.getAll(user);
  }
}
