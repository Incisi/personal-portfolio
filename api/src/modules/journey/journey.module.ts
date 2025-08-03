import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Book } from './entities/book.entity';
import { Article } from './entities/article.entity';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { Technology } from './entities/technology.entity';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Book, Article, Technology, Experience])],
  providers: [JourneyService],
  controllers: [JourneyController]
})
export class JourneyModule {}
