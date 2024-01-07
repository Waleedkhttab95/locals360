import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide, GuideSchema } from './entities/guide.entity';
import {
  GuideProfile,
  GuideProfileSchema,
} from './entities/guide-profile.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { GuideToken, GuideTokenSchema } from './entities/guide.token.entity';

@Module({
  controllers: [GuideController],
  providers: [GuideService],
  imports: [
    MongooseModule.forFeature([
      { name: Guide.name, schema: GuideSchema },
      { name: GuideProfile.name, schema: GuideProfileSchema },
      { name: GuideToken.name, schema: GuideTokenSchema },
    ]),
    UtilitiesModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
    GuideService,
  ],
})
export class GuideModule {}
