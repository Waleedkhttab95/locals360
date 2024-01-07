import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './entities/rating.entity';
import { Experience, ExperienceSchema } from 'src/experience/entities/experience.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: Experience.name, schema: ExperienceSchema },
      { name: User.name, schema: UserSchema },

    ])
  ]
})
export class RatingModule {}
