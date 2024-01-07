import { Controller, Get, Post, Body, Patch, Param, Delete , Request ,UseInterceptors ,UploadedFile, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('/reservations')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getReservations(@Request() req:any) {
    console.log(req.user)
    return this.usersService.getMyReservations(req.user.id);
  }


  @Patch()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req:any , @Body() updateUserDto: UpdateUserDto) {

    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Post('upload')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Request() req:any , @UploadedFile() file: Express.Multer.File) {

    return this.usersService.updateProfileImage(req.user.id,file);
  }


}
