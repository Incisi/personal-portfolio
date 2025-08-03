import { IsString, IsNotEmpty, IsDateString, IsUrl, IsOptional } from 'class-validator';

export class CreateCourseDto {
    @IsString() @IsNotEmpty() title: string;
    @IsString() @IsNotEmpty() institution: string;
    @IsDateString() completionDate: Date;
    @IsUrl() @IsOptional() certificateUrl?: string;
}