import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsString() @IsNotEmpty() title: string;
    @IsString() @IsNotEmpty() author: string;
    @IsUrl() @IsOptional() coverUrl?: string;
    @IsString() @IsNotEmpty() summary: string;
}