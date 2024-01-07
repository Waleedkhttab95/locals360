import { Test, TestingModule } from '@nestjs/testing';
import { GuideRequestService } from './guide-request.service';

describe('GuideRequestService', () => {
  let service: GuideRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuideRequestService],
    }).compile();

    service = module.get<GuideRequestService>(GuideRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
