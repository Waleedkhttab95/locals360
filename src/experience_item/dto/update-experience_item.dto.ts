import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceItemDto } from "./CreateExperienceItemDto";

export class UpdateExperienceItemDto extends PartialType(CreateExperienceItemDto) {}
