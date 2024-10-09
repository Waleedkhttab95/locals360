import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceCategoryDto } from "./CreateExperienceCategory.dto";

export class UpdateExperienceCategoryDto extends PartialType(CreateExperienceCategoryDto) {}
