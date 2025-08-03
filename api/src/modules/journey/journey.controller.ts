import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards, Header, StreamableFile } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JourneyService } from './journey.service';
import {
  CreateArticleDto, UpdateArticleDto, CreateBookDto, UpdateBookDto,
  CreateCourseDto, UpdateCourseDto, CreateExperienceDto, UpdateExperienceDto,
  CreateTechnologyDto, UpdateTechnologyDto
} from './dto';

@Controller('journey')
export class JourneyController {
    constructor(private readonly journeyService: JourneyService) {}

    @Get('sitemap.xml')
	@Header('Content-Type', 'application/xml')
	@Header('Content-Encoding', 'gzip')
	async getSitemap(): Promise<StreamableFile> {
		const sitemapBuffer = await this.journeyService.generateSitemap();
		return new StreamableFile(sitemapBuffer);
	}

    // --- Technology Endpoints ---
    @UseGuards(JwtAuthGuard)
    @Post('tech-stack')
    createTechnology(@Body() dto: CreateTechnologyDto) { return this.journeyService.createTechnology(dto); }
    @Get('tech-stack')
    findAllTechs() { return this.journeyService.findAllTechs(); }
    @Get('tech-stack/:id')
    findOneTechnology(@Param('id') id: string) { return this.journeyService.findOneTechnology(id); }
    @UseGuards(JwtAuthGuard)
    @Patch('tech-stack/:id')
    updateTechnology(@Param('id') id: string, @Body() dto: UpdateTechnologyDto) { return this.journeyService.updateTechnology(id, dto); }
    @UseGuards(JwtAuthGuard)
    @Delete('tech-stack/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeTechnology(@Param('id') id: string) { return this.journeyService.removeTechnology(id); }

    // --- Experience Endpoints ---
    @UseGuards(JwtAuthGuard)
    @Post('experiences')
    createExperience(@Body() dto: CreateExperienceDto) { return this.journeyService.createExperience(dto); }
    @Get('experiences')
    findAllExperiences() { return this.journeyService.findAllExperiences(); }
    @Get('experiences/:id')
    findOneExperience(@Param('id') id: string) { return this.journeyService.findOneExperience(id); }
    @UseGuards(JwtAuthGuard)
    @Patch('experiences/:id')
    updateExperience(@Param('id') id: string, @Body() dto: UpdateExperienceDto) { return this.journeyService.updateExperience(id, dto); }
    @UseGuards(JwtAuthGuard)
    @Delete('experiences/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeExperience(@Param('id') id: string) { return this.journeyService.removeExperience(id); }

    // --- Course Endpoints ---
    @UseGuards(JwtAuthGuard)
    @Post('courses')
    createCourse(@Body() dto: CreateCourseDto) { return this.journeyService.createCourse(dto); }
    @Get('courses')
    findAllCourses() { return this.journeyService.findAllCourses(); }
    @Get('courses/:id')
    findOneCourse(@Param('id') id: string) { return this.journeyService.findOneCourse(id); }
    @UseGuards(JwtAuthGuard)
    @Patch('courses/:id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) { return this.journeyService.updateCourse(id, dto); }
    @UseGuards(JwtAuthGuard)
    @Delete('courses/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeCourse(@Param('id') id: string) { return this.journeyService.removeCourse(id); }

    // --- Book Endpoints ---
    @UseGuards(JwtAuthGuard)
    @Post('books')
    createBook(@Body() dto: CreateBookDto) { return this.journeyService.createBook(dto); }
    @Get('books')
    findAllBooks() { return this.journeyService.findAllBooks(); }
    @Get('books/:id')
    findOneBook(@Param('id') id: string) { return this.journeyService.findOneBook(id); }
    @UseGuards(JwtAuthGuard)
    @Patch('books/:id')
    updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) { return this.journeyService.updateBook(id, dto); }
    @UseGuards(JwtAuthGuard)
    @Delete('books/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeBook(@Param('id') id: string) { return this.journeyService.removeBook(id); }

    // --- Article Endpoints ---
    @UseGuards(JwtAuthGuard)
    @Post('articles')
    createArticle(@Body() dto: CreateArticleDto) { return this.journeyService.createArticle(dto); }
    @Get('articles')
    findAllArticles() { return this.journeyService.findAllArticles(); }
    @Get('articles/:id')
    findOneArticle(@Param('id') id: string) { return this.journeyService.findOneArticle(id); }
    @UseGuards(JwtAuthGuard)
    @Patch('articles/:id')
    updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto) { return this.journeyService.updateArticle(id, dto); }
    @UseGuards(JwtAuthGuard)
    @Delete('articles/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeArticle(@Param('id') id: string) { return this.journeyService.removeArticle(id); }
}