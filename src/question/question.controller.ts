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

  @Post('/answer/:id')
  postAnswer(@Param('id') id: number, @Body() answer) {
    id = +id;
    return this.questionService.createAnswer(id, answer.result);
  }
}
