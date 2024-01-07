import { Test, TestingModule } from '@nestjs/testing';
import { GuideRequestController } from './guide-request.controller';
import { GuideRequestService } from './guide-request.service';

describe('GuideRequestController', () => {
  let controller: GuideRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuideRequestController],
      providers: [GuideRequestService],
    }).compile();

    controller = module.get<GuideRequestController>(GuideRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
