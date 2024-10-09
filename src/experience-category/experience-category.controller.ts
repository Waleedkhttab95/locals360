import { Controller , Get, Post, Body} from '@nestjs/common';
import { ExperienceCategoryService } from './experience-category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateExperienceCategoryDto } from './dto/CreateExperienceCategory.dto';
@ApiTags('Experience Category')
@Controller('experience-category')
export class ExperienceCategoryController {
    constructor(private readonly experienceCategoryService: ExperienceCategoryService) {}

    @Get()
    async getAll() {
        return await this.experienceCategoryService.getAll();
    }

    @Post()
    async create(@Body() createExperienceCategoryDto: CreateExperienceCategoryDto) {
        return await this.experienceCategoryService.create(createExperienceCategoryDto);
    }
}
