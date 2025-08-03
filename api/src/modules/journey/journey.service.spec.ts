import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JourneyService } from './journey.service';
import { Course, Book, Article, Technology, Experience } from './entities';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTechnologyDto, UpdateTechnologyDto, CreateExperienceDto, UpdateExperienceDto, CreateCourseDto, UpdateCourseDto, CreateBookDto, UpdateBookDto, CreateArticleDto, UpdateArticleDto } from './dto';
import * as bcrypt from 'bcrypt';

const mockRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
});

type MockRepository = ReturnType<typeof mockRepository>;

describe('JourneyService', () => {
  let service: JourneyService;
  let techRepository: MockRepository;
  let experienceRepository: MockRepository;
  let courseRepository: MockRepository;
  let bookRepository: MockRepository;
  let articleRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneyService,
        { provide: getRepositoryToken(Course), useFactory: mockRepository },
        { provide: getRepositoryToken(Book), useFactory: mockRepository },
        { provide: getRepositoryToken(Article), useFactory: mockRepository },
        { provide: getRepositoryToken(Technology), useFactory: mockRepository },
        { provide: getRepositoryToken(Experience), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<JourneyService>(JourneyService);
    techRepository = module.get(getRepositoryToken(Technology));
    experienceRepository = module.get(getRepositoryToken(Experience));
    courseRepository = module.get(getRepositoryToken(Course));
    bookRepository = module.get(getRepositoryToken(Book));
    articleRepository = module.get(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Technology CRUD', () => {
    const mockTechDto: CreateTechnologyDto = { name: 'React', category: 'Front-end', iconName: 'FaReact', description: 'A lib.' };
    const mockTechEntity = { id: 'uuid-1', ...mockTechDto };

    it('should create and return a technology', async () => {
      techRepository.create.mockReturnValue(mockTechEntity);
      techRepository.save.mockResolvedValue(mockTechEntity);
      const result = await service.createTechnology(mockTechDto);
      expect(result).toEqual(mockTechEntity);
    });

    it('should return an array of technologies', async () => {
      techRepository.find.mockResolvedValue([mockTechEntity]);
      const result = await service.findAllTechs();
      expect(result).toEqual([mockTechEntity]);
    });

    it('should return a single technology if found', async () => {
      techRepository.findOneBy.mockResolvedValue(mockTechEntity);
      const result = await service.findOneTechnology('uuid-1');
      expect(result).toEqual(mockTechEntity);
    });

    it('should throw NotFoundException if technology is not found', async () => {
      techRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOneTechnology('uuid-not-found')).rejects.toThrow(NotFoundException);
    });
    
    it('should update and return a technology', async () => {
      const updateDto: UpdateTechnologyDto = { description: 'Updated description' };
      const updatedEntity = { ...mockTechEntity, ...updateDto };
      techRepository.preload.mockResolvedValue(updatedEntity);
      techRepository.save.mockResolvedValue(updatedEntity);
      const result = await service.updateTechnology('uuid-1', updateDto);
      expect(result).toEqual(updatedEntity);
    });

    it('should throw NotFoundException if technology to update is not found', async () => {
      techRepository.preload.mockResolvedValue(null);
      await expect(service.updateTechnology('uuid-not-found', {})).rejects.toThrow(NotFoundException);
    });

    it('should remove a technology successfully', async () => {
      jest.spyOn(service, 'findOneTechnology').mockResolvedValue(mockTechEntity);
      techRepository.remove.mockResolvedValue(undefined);
      await service.removeTechnology('uuid-1');
      expect(techRepository.remove).toHaveBeenCalledWith(mockTechEntity);
    });
  });

  describe('Experience CRUD', () => {
    const mockExperienceDto: CreateExperienceDto = { role: 'Dev', company: 'Tech Co', period: '2025', description: ['code'], order: 0 };
    const mockExperienceEntity = { id: 'uuid-exp-1', ...mockExperienceDto };

    it('should create and return an experience', async () => {
      experienceRepository.create.mockReturnValue(mockExperienceEntity);
      experienceRepository.save.mockResolvedValue(mockExperienceEntity);
      const result = await service.createExperience(mockExperienceDto);
      expect(result).toEqual(mockExperienceEntity);
    });

    it('should return an array of experiences', async () => {
      experienceRepository.find.mockResolvedValue([mockExperienceEntity]);
      const result = await service.findAllExperiences();
      expect(result).toEqual([mockExperienceEntity]);
    });

    it('should return a single experience if found', async () => {
      experienceRepository.findOneBy.mockResolvedValue(mockExperienceEntity);
      const result = await service.findOneExperience('uuid-exp-1');
      expect(result).toEqual(mockExperienceEntity);
    });

    it('should throw NotFoundException if experience is not found', async () => {
      experienceRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOneExperience('uuid-not-found')).rejects.toThrow(NotFoundException);
    });

    it('should update and return an experience', async () => {
      const updateDto: UpdateExperienceDto = { company: 'New Tech Co' };
      const updatedEntity = { ...mockExperienceEntity, ...updateDto };
      experienceRepository.preload.mockResolvedValue(updatedEntity);
      experienceRepository.save.mockResolvedValue(updatedEntity);
      const result = await service.updateExperience('uuid-exp-1', updateDto);
      expect(result).toEqual(updatedEntity);
    });

    it('should remove an experience successfully', async () => {
      jest.spyOn(service, 'findOneExperience').mockResolvedValue(mockExperienceEntity);
      experienceRepository.remove.mockResolvedValue(undefined);
      await service.removeExperience('uuid-exp-1');
      expect(experienceRepository.remove).toHaveBeenCalledWith(mockExperienceEntity);
    });
  });

  describe('Course CRUD', () => {
    const mockCourseDto: CreateCourseDto = { title: 'NestJS Course', institution: 'School', completionDate: new Date() };
    const mockCourseEntity = { id: 'uuid-course-1', ...mockCourseDto };

    it('should create and return a course', async () => {
      courseRepository.create.mockReturnValue(mockCourseEntity);
      courseRepository.save.mockResolvedValue(mockCourseEntity);
      const result = await service.createCourse(mockCourseDto);
      expect(result).toEqual(mockCourseEntity);
    });

    it('should return an array of courses', async () => {
      courseRepository.find.mockResolvedValue([mockCourseEntity]);
      const result = await service.findAllCourses();
      expect(result).toEqual([mockCourseEntity]);
    });

    it('should return a single course if found', async () => {
      courseRepository.findOneBy.mockResolvedValue(mockCourseEntity);
      const result = await service.findOneCourse('uuid-course-1');
      expect(result).toEqual(mockCourseEntity);
    });

    it('should throw NotFoundException if course is not found', async () => {
      courseRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOneCourse('uuid-not-found')).rejects.toThrow(NotFoundException);
    });

    it('should update and return a course', async () => {
      const updateDto: UpdateCourseDto = { institution: 'New School' };
      const updatedEntity = { ...mockCourseEntity, ...updateDto };
      courseRepository.preload.mockResolvedValue(updatedEntity);
      courseRepository.save.mockResolvedValue(updatedEntity);
      const result = await service.updateCourse('uuid-course-1', updateDto);
      expect(result).toEqual(updatedEntity);
    });

    it('should remove a course successfully', async () => {
      jest.spyOn(service, 'findOneCourse').mockResolvedValue(mockCourseEntity);
      courseRepository.remove.mockResolvedValue(undefined);
      await service.removeCourse('uuid-course-1');
      expect(courseRepository.remove).toHaveBeenCalledWith(mockCourseEntity);
    });
  });

  describe('Book CRUD', () => {
    const mockBookDto: CreateBookDto = { title: 'Clean Code', author: 'Robert C. Martin', summary: 'A book about code.' };
    const mockBookEntity = { id: 'uuid-book-1', ...mockBookDto };

    it('should create and return a book', async () => {
      bookRepository.create.mockReturnValue(mockBookEntity);
      bookRepository.save.mockResolvedValue(mockBookEntity);
      const result = await service.createBook(mockBookDto);
      expect(result).toEqual(mockBookEntity);
    });

    it('should return an array of books', async () => {
      bookRepository.find.mockResolvedValue([mockBookEntity]);
      const result = await service.findAllBooks();
      expect(result).toEqual([mockBookEntity]);
    });

    it('should return a single book if found', async () => {
      bookRepository.findOneBy.mockResolvedValue(mockBookEntity);
      const result = await service.findOneBook('uuid-book-1');
      expect(result).toEqual(mockBookEntity);
    });

    it('should throw NotFoundException if book is not found', async () => {
      bookRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOneBook('uuid-not-found')).rejects.toThrow(NotFoundException);
    });

    it('should update and return a book', async () => {
      const updateDto: UpdateBookDto = { author: 'Uncle Bob' };
      const updatedEntity = { ...mockBookEntity, ...updateDto };
      bookRepository.preload.mockResolvedValue(updatedEntity);
      bookRepository.save.mockResolvedValue(updatedEntity);
      const result = await service.updateBook('uuid-book-1', updateDto);
      expect(result).toEqual(updatedEntity);
    });

    it('should remove a book successfully', async () => {
      jest.spyOn(service, 'findOneBook').mockResolvedValue(mockBookEntity);
      bookRepository.remove.mockResolvedValue(undefined);
      await service.removeBook('uuid-book-1');
      expect(bookRepository.remove).toHaveBeenCalledWith(mockBookEntity);
    });
  });

  describe('Article CRUD', () => {
    const mockArticleDto: CreateArticleDto = { title: 'My First Post', content: 'Hello World' };
    const mockArticleEntity = { id: 'uuid-article-1', createdAt: new Date(), ...mockArticleDto };

    it('should create and return an article', async () => {
      articleRepository.create.mockReturnValue(mockArticleEntity);
      articleRepository.save.mockResolvedValue(mockArticleEntity);
      const result = await service.createArticle(mockArticleDto);
      expect(result).toEqual(mockArticleEntity);
    });

    it('should return an array of articles', async () => {
      articleRepository.find.mockResolvedValue([mockArticleEntity]);
      const result = await service.findAllArticles();
      expect(result).toEqual([mockArticleEntity]);
    });

    it('should return a single article if found', async () => {
      articleRepository.findOneBy.mockResolvedValue(mockArticleEntity);
      const result = await service.findOneArticle('uuid-article-1');
      expect(result).toEqual(mockArticleEntity);
    });

    it('should throw NotFoundException if article is not found', async () => {
      articleRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOneArticle('uuid-not-found')).rejects.toThrow(NotFoundException);
    });

    it('should update and return an article', async () => {
      const updateDto: UpdateArticleDto = { content: 'Updated content' };
      const updatedEntity = { ...mockArticleEntity, ...updateDto };
      articleRepository.preload.mockResolvedValue(updatedEntity);
      articleRepository.save.mockResolvedValue(updatedEntity);
      const result = await service.updateArticle('uuid-article-1', updateDto);
      expect(result).toEqual(updatedEntity);
    });

    it('should remove an article successfully', async () => {
      jest.spyOn(service, 'findOneArticle').mockResolvedValue(mockArticleEntity);
      articleRepository.remove.mockResolvedValue(undefined);
      await service.removeArticle('uuid-article-1');
      expect(articleRepository.remove).toHaveBeenCalledWith(mockArticleEntity);
    });
  });
});