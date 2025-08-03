import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
    @IsString() @IsNotEmpty() name: string;
    @IsString() @IsNotEmpty() category: string;
    @IsString() @IsNotEmpty() iconName: string;
    @IsString() @IsNotEmpty() description: string;
}