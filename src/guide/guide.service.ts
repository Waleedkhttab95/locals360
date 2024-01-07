import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/auth/auth.dto';
import { GuideProfile } from './entities/guide-profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { GuideToken } from './entities/guide.token.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class GuideService {
  constructor(
    @InjectModel(Guide.name)
    private readonly guideRepository: Model<Guide>,
    @InjectModel(GuideProfile.name)
    private readonly guideProfileRepository: Model<GuideProfile>,
    @InjectModel(GuideToken.name)
    private readonly guideTokenRepository: Model<GuideToken>,
    private readonly utilitiesService: UtilitiesService,
  ) {}

  async create(createGuideDto: CreateGuideDto) {
    createGuideDto.email = createGuideDto.email.toLowerCase();
    const existUser = await this.guideRepository.findOne({
      email: createGuideDto.email,
    });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createGuideDto.password,
      saltRounds,
    );
    createGuideDto.password = hashedPassword;

    const user = await this.guideRepository.create({
      isActive: false,
      ...createGuideDto,
    });
  

    // create a profile

    const profile  = await this.createProfile(user._id);

    user.profile = profile;

    await user.save();

    
    return {
      email: user.email,
      id: user._id,
    };
  }

  async login(authDto: AuthDto) {
    let { email, password } = authDto;
    email = email.toLowerCase();
    const guide = await this.guideRepository.findOne({
      email: authDto.email,
    });

    if (!guide) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (guide.isActive === false) {
      throw new HttpException(
        'Your Account is unactive , please contact with support ',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await bcrypt.compare(password, guide.password)) {
      return guide;
    } else {
      const isMatch = await bcrypt.compare(password, guide.password);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    const guide = await this.guideRepository.findById(id);

    if (!guide) {
      throw new Error('Guide not found');
    }

    Object.assign(guide, updateGuideDto);
    await guide.save();
    await this.guideRepository.findById(id);
  }

  async remove(id: string) {
    const guide = await this.guideProfileRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isActive: false,
        },
      },
    );

    if (!guide) throw new NotFoundException('Guide not found !');

    return true;
  }

  async getMyReservations(guideId: string) {
    const guide = await this.guideRepository
      .findById(guideId)
      .populate('reservations');

    return guide.reservations;
  }

  async storeGuideMobileToken(guideId: string, token: string) {
    const guideToken = await this.guideTokenRepository.findOne({
      guide: guideId,
    });

    if (!guideToken) {
      const newToken = await this.guideTokenRepository.create({
        token: token,
        guide: guideId,
      });

      await newToken.save();

      return true;
    } else {
      guideToken.token = token;
      await guideToken.save();
    }
  }

  async createProfile(guideId: ObjectId) {
    const profile = await this.guideProfileRepository.create({
      guide: guideId,
    });

    await profile.save();

    return profile;
  }
}
