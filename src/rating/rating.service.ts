import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingRepository: Model<Rating>,
    @InjectModel(Experience.name)
    private readonly experienceRepository: Model<Experience>,
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  async create(createReviewParams: CreateRatingDto, userId: string) {
    const experience = await this.experienceRepository.findById(
      createReviewParams.experienceId,
    );

    if (!experience) throw new NotFoundException('Not found experience ');

    const user = await this.userRepository.findById(userId);

    const review = await this.ratingRepository.create({
      user: user,
      ...createReviewParams,
    });

    experience.reviews.push(review);
    user.reviews.push(review);

    await Promise.all([
      await review.save(),
      await user.save(),
      await experience.save(),
    ]);

    return review;
  }

  async getExperienceReviews(experienceId: string) {
    const result = await this.experienceRepository
      .findById(experienceId)
      .populate('reviews');

    return result.reviews;
  }
}
