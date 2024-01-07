import { Module } from '@nestjs/common';
import { GuideRequestService } from './guide-request.service';
import { GuideRequestController } from './guide-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GuideRequest, GuideRequestSchema } from './entities/GuideRequest';

@Module({
  controllers: [GuideRequestController],
  providers: [GuideRequestService],
  imports: [  MongooseModule.forFeature([
    { name: GuideRequest.name, schema: GuideRequestSchema },
  ]) ]
})
export class GuideRequestModule {}
