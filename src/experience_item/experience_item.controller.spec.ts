import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceItemController } from './experience_item.controller';
import { ExperienceItemService } from './experience_item.service';

describe('ExperienceItemController', () => {
  let controller: ExperienceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceItemController],
      providers: [ExperienceItemService],
    }).compile();

    controller = module.get<ExperienceItemController>(ExperienceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
