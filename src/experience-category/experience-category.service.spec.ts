import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceCategoryService } from './experience-category.service';

describe('ExperienceCategoryService', () => {
  let service: ExperienceCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceCategoryService],
    }).compile();

    service = module.get<ExperienceCategoryService>(ExperienceCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
