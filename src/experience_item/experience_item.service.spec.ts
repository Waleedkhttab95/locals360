import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceItemService } from './experience_item.service';

describe('ExperienceItemService', () => {
  let service: ExperienceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceItemService],
    }).compile();

    service = module.get<ExperienceItemService>(ExperienceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
