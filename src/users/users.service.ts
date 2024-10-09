import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateSocialUserDto } from './dto/create-user-social.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { UserToken } from './entities/user.token.entity';
import { Wishlist } from './entities/user.wishlist.entity';
import { ObjectId } from 'mongodb';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    @InjectModel(UserToken.name)
    private readonly userToeknRepository: Model<UserToken>,
    @InjectModel(Wishlist.name)
    private readonly wishlistRepository: Model<Wishlist>,
    private readonly utilitiesService: UtilitiesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    const existUser = await this.checkIfUserExist(createUserDto.email);

    if (existUser) throw new BadRequestException('User already exist');

    // Hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    createUserDto.password = hashedPassword;

    const user = await this.userRepository.create({
      isActive: true,
      ...createUserDto,
    });
    await user.save();


    // create a new empty wishlist

    await this.createWishlist(user._id);

    return user;
  }

  async createBySocial(createUserDto: CreateSocialUserDto) {
    const user = await this.userRepository.create({
      isActive: true,
      ...createUserDto,
    });
    await user.save();

    return {
      email: user.email,
      id: user.id,
    };
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto;
    
    const user = await this.userRepository.findOne({
      email: email.toLocaleLowerCase(),
    });

    if (!user || !user.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (user.isActive === false) {
      throw new HttpException(
        'Your Account is unactive , please contact with support ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByEmail(email: string) {
    const result = await this.userRepository.findOne({
      email: email,
    });
    if (!result) throw new NotFoundException('User not found');
    return result.id;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id)
    .select('-password -reservations');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // async updateProfileImage(id: string, file: Express.Multer.File) {
  //   const user = await this.userRepository.findById(id);

  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const imgURL = await this.utilitiesService.uploadFile(file);

  //   user.profileImg = imgURL.Location;
  //   await user.save();
  //   return user;
  // }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateUserDto);
    return await user.save();
  }

  async getMyReservations(userId: string) {
    const user = await this.userRepository
      .findById(userId)
      .populate({
        path: 'reservations',
        select: '-user',
        populate: [
          {
            path: 'experience',
            populate: {
            path: 'location',
            populate: {
              path: 'city',
            },
          },
        },
        {
          path: 'guide',
          select: '-password',
        },
        {
          path: 'location',
          select: '-_id',
          populate: {
            path: 'city',
            select: '-_id',
          },
        }
        ]
      });
    if (!user) throw new NotFoundException('User not found');
    if (!user.reservations) throw new NotFoundException('You have no reservations');

    // Filter the reservations to get upcoming reservations and past reservations baseed on the current date  
    const currentDate = new Date();
    console.log(user.reservations)
    const upcomingReservations = user.reservations.filter((reservation: Reservation) => reservation.dateOfExperience > currentDate);
    const pastReservations = user.reservations.filter((reservation: Reservation) => reservation.dateOfExperience < currentDate);

    return {
      upcomingReservations,
      pastReservations,
    };
  }



  async storeUserMobileToken(userId: string, token: string) {
    const userToken = await this.userToeknRepository.findOne({
      user: userId,
    });

    if (!userToken) {
      const newToken = await this.userToeknRepository.create({
        token: token,
        user: userId,
      });

      await newToken.save();

      return true;
    } else {
      userToken.token = token;
      await userToken.save();
    }
  }

  async checkIfUserExist(email: string) {
    const existUser = await this.userRepository.findOne({
      email: email.toLowerCase(),
    });

    if (!existUser) {
      return null;
    }
    return existUser;
  }

  async createWishlist(userId: ObjectId) {
    try {
      const wishlist = await this.wishlistRepository.create({
        user: userId,
        experienceList: [],
      });
      await wishlist.save();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async addToWishlist(experienceId: string, userId: string) {

    try{
      const wishlist = await this.wishlistRepository.findOneAndUpdate(
        { user: userId },
        {
          $push: { experienceList: experienceId },
        },
      );
  
      if (!wishlist) throw new NotFoundException('Wishlist not found ');
  
      return true;
    } catch(err){
      console.log(err)
      return false
    }

  }

  async getUserWishlist(userId: string) {
    const wishlist = await this.wishlistRepository
      .findOne({ user: userId })
      .populate({
        path: 'experienceList',
        select: '_id title',
      });

    if (!wishlist) throw new NotFoundException('Wishlist not found ');

    return wishlist;
  }


}
