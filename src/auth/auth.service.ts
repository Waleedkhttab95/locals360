import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { TokenPayloadDto } from './tokenPayload.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateGuideDto } from 'src/guide/dto/create-guide.dto';
import { GuideService } from 'src/guide/guide.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private guideService: GuideService,
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      return {
        message: 'Invalid sign-in',
        errCode: 0,
      };
    } else {
      const { email, firstName, lastName } = req.user;

      // check if this user have a account or not
      const existUser = await this.userService.checkIfUserExist(
        email.toLowerCase(),
      );

      if (!existUser) {
        const user = await this.userService.createBySocial({
          email: email.toLowerCase(),
          firstName: firstName,
          lastName: lastName,
        });

        return {
          message: 'Successful sign-in',
          user: user,
          errCode: 2,
        };
      }

      return {
        message: 'Successful sign-in',
        user: req.user,
        errCode: 1,
      };
    }
  }

  async createUser(userDTO: CreateUserDto) {
    return await this.userService.create(userDTO);
  }
  async signPayload(payload: TokenPayloadDto) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '365d' });
  }

  async validateUser(payload: AuthDto) {
    return await this.userService.login(payload);
  }

  async validateUserByEmail(email: string ) {
    return await this.userService.getUserByEmail(email);
  }

  // Guide Auth section
  async createGuide(guideDto: CreateGuideDto) {
    return await this.guideService.create(guideDto);
  }

  async signPayloadGuide(payload: TokenPayloadDto) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '365d' });
  }

  async validateGuide(payload: AuthDto) {
    return await this.guideService.login(payload);
  }
}
