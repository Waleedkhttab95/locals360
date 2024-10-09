import { AuthService } from './auth.service';
import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './auth.dto';
import { TokenGuidePayloadDto, TokenPayloadDto } from './tokenPayload.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserResDto } from 'src/users/dto/userRes.dto';
import { CreateGuideDto } from 'src/guide/dto/create-guide.dto';
import { GuideResDto } from 'src/guide/dto/guideRes.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    let user = await this.authService.googleLogin(req);

    const payload: TokenPayloadDto = {
      email: req.email,
      id: req._id,
    };

    const token = await this.authService.signPayload(payload);
    user['token'] = token;

    return user;
  }

  @Serialize(UserResDto)
  @Post('/register')
  async registertionUser(
    @Body()
    userDTO: CreateUserDto,
  ) {
    const user = await this.authService.createUser(userDTO);

    const payload: TokenPayloadDto = {
      email: user.email,
      id: user._id,
    };

    const token = await this.authService.signPayload(payload);
    user['token'] = token;

    return user;
  }

  @Serialize(UserResDto)
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(authDto);
    const payload: TokenPayloadDto = {
      email: user.email.toLowerCase(),
      id: user._id,
    };

    console.log(payload);
    const token = await this.authService.signPayload(payload);
    user['token'] = token;

    return user;
  }

  // Guide Auth section

  @Serialize(GuideResDto)
  @Post('/guide/register')
  async registertionGuide(
    @Body()
    guideDTO: CreateGuideDto,
  ) {
    const guide = await this.authService.createGuide(guideDTO);

    const payload: TokenGuidePayloadDto = {
      email: guide.email,
      id: guide.id.toHexString(),
      isGuide: true,
    };

    const token = await this.authService.signPayloadGuide(payload);
    guide['token'] = token;

    return guide;
  }

  @Serialize(GuideResDto)
  @Post('/guide/login')
  async loginGuide(@Body() authDto: AuthDto) {
    const guide = await this.authService.validateGuide(authDto);
    const payload: TokenGuidePayloadDto = {
      email: guide.email,
      id: guide.id.toString(),
      isGuide: true,
    };

    const token = await this.authService.signPayloadGuide(payload);
    guide['token'] = token;

    return guide;
  }
}
