import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, Book, Article, Technology, Experience } from './entities';
import {
  CreateArticleDto, UpdateArticleDto, CreateBookDto, UpdateBookDto,
  CreateCourseDto, UpdateCourseDto, CreateExperienceDto, UpdateExperienceDto,
  CreateTechnologyDto, UpdateTechnologyDto
} from './dto';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    @InjectRepository(Technology) private readonly techRepository: Repository<Technology>,
    @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>,
  ) {}

  // --- CRUD for Technology ---
  createTechnology(dto: CreateTechnologyDto) {
    const tech = this.techRepository.create(dto);
    return this.techRepository.save(tech);
  }
  findAllTechs() { return this.techRepository.find(); }
  async findOneTechnology(id: string) {
    const tech = await this.techRepository.findOneBy({ id });
    if (!tech) throw new NotFoundException(`Tecnologia com ID "${id}" não encontrada`);
    return tech;
  }
  async updateTechnology(id: string, dto: UpdateTechnologyDto) {
    const tech = await this.techRepository.preload({ id, ...dto });
    if (!tech) throw new NotFoundException(`Tecnologia com ID "${id}" não encontrada`);
    return this.techRepository.save(tech);
  }
  async removeTechnology(id: string) {
    const tech = await this.findOneTechnology(id);
    return this.techRepository.remove(tech);
  }

  // --- CRUD for Experience ---
  createExperience(dto: CreateExperienceDto) {
    const exp = this.experienceRepository.create(dto);
    return this.experienceRepository.save(exp);
  }
  findAllExperiences() { return this.experienceRepository.find({ order: { order: 'ASC' } }); }
  async findOneExperience(id: string) {
    const exp = await this.experienceRepository.findOneBy({ id });
    if (!exp) throw new NotFoundException(`Experiência com ID "${id}" não encontrada`);
    return exp;
  }
  async updateExperience(id: string, dto: UpdateExperienceDto) {
    const exp = await this.experienceRepository.preload({ id, ...dto });
    if (!exp) throw new NotFoundException(`Experiência com ID "${id}" não encontrada`);
    return this.experienceRepository.save(exp);
  }
  async removeExperience(id: string) {
    const exp = await this.findOneExperience(id);
    return this.experienceRepository.remove(exp);
  }

  // --- CRUD for Course ---
  createCourse(dto: CreateCourseDto) {
    const course = this.courseRepository.create(dto);
    return this.courseRepository.save(course);
  }
  findAllCourses() { return this.courseRepository.find({ order: { completionDate: 'DESC' } }); }
  async findOneCourse(id: string) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) throw new NotFoundException(`Curso com ID "${id}" não encontrado`);
    return course;
  }
  async updateCourse(id: string, dto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({ id, ...dto });
    if (!course) throw new NotFoundException(`Curso com ID "${id}" não encontrado`);
    return this.courseRepository.save(course);
  }
  async removeCourse(id: string) {
    const course = await this.findOneCourse(id);
    return this.courseRepository.remove(course);
  }

  // --- CRUD for Book ---
  createBook(dto: CreateBookDto) {
    const book = this.bookRepository.create(dto);
    return this.bookRepository.save(book);
  }
  findAllBooks() { return this.bookRepository.find(); }
  async findOneBook(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException(`Livro com ID "${id}" não encontrado`);
    return book;
  }
  async updateBook(id: string, dto: UpdateBookDto) {
    const book = await this.bookRepository.preload({ id, ...dto });
    if (!book) throw new NotFoundException(`Livro com ID "${id}" não encontrado`);
    return this.bookRepository.save(book);
  }
  async removeBook(id: string) {
    const book = await this.findOneBook(id);
    return this.bookRepository.remove(book);
  }

  // --- CRUD for Article ---
  createArticle(dto: CreateArticleDto) {
    const article = this.articleRepository.create(dto);
    return this.articleRepository.save(article);
  }
  findAllArticles() { return this.articleRepository.find({ order: { createdAt: 'DESC' } }); }
  async findOneArticle(id: string) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) throw new NotFoundException(`Artigo com ID "${id}" não encontrado`);
    return article;
  }
  async updateArticle(id: string, dto: UpdateArticleDto) {
    const article = await this.articleRepository.preload({ id, ...dto });
    if (!article) throw new NotFoundException(`Artigo com ID "${id}" não encontrado`);
    return this.articleRepository.save(article);
  }
  async removeArticle(id: string) {
    const article = await this.findOneArticle(id);
    return this.articleRepository.remove(article);
  }
}

// Crie um arquivo 'entities/index.ts' e 'dto/index.ts' para facilitar as importações
// Exemplo: export * from './course.entity';
// Isso permite fazer: import { Course, ... } from './entities';