import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Question } from './question/entities/question.entity';
import { Answer } from './question/entities/answer.entity';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'question-and-answer',
      logging: true,
      synchronize: true,
      entities: [Question, Answer],
    }),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
