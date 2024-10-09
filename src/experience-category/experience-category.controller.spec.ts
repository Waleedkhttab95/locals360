import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceCategoryController } from './experience-category.controller';

describe('ExperienceCategoryController', () => {
  let controller: ExperienceCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceCategoryController],
    }).compile();

    controller = module.get<ExperienceCategoryController>(ExperienceCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
