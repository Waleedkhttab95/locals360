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
    if (!user) throw new NotFoundException('User not found');

    // Validate the input data
    if (!createReviewParams.body || !createReviewParams.stars) {
      throw new Error('Invalid input data');
    }

  
    try {
      const review = await this.ratingRepository.create({
        user: user,
        body: createReviewParams.body,
        rating: createReviewParams.stars,
        experience: experience._id,
      });
      experience.reviews.push(review);
      user.reviews.push(review);
      await Promise.all([
        await review.save(),
        await experience.save(),
        await user.save(),
      ]);
      return review;
    } catch (error) {
      console.error('Error saving review:', error);
      throw new Error('Failed to save review');
    }
  }

  async getExperienceReviews(experienceId: string) {
    const result = await this.experienceRepository
      .findById(experienceId)
      .populate('reviews');

    return result.reviews;
  }
}
