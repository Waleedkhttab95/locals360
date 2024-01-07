import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceItemService } from './experience_item.service';
import { CreateExperienceItemDto } from "./dto/CreateExperienceItemDto";
import { UpdateExperienceItemDto } from './dto/update-experience_item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('experience-item')
@Controller('experience-item')
export class ExperienceItemController {
  constructor(private readonly experienceItemService: ExperienceItemService) {}

  @Post()
  create(@Body() createExperienceItemDto: CreateExperienceItemDto) {
    return this.experienceItemService.create(createExperienceItemDto);
  }

  @Get()
  findAll() {
    return this.experienceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceItemDto: UpdateExperienceItemDto) {
    return this.experienceItemService.update(id, updateExperienceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceItemService.remove(+id);
  }
}
