import { IsString, IsNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateExperienceDto {
    @IsString() @IsNotEmpty() role: string;
    @IsString() @IsNotEmpty() company: string;
    @IsString() @IsNotEmpty() period: string;
    @IsArray() @IsString({ each: true }) description: string[];
    @IsInt() order: number;
}