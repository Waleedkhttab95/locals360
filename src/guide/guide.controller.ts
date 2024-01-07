import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UploadedFile, UseInterceptors ,UseGuards} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuideGuard } from 'src/guards/guide.guards';

@ApiTags('Guide')
@Controller('guide')
export class GuideController {
   constructor(private readonly guideService: GuideService) {}

   @Get('/reservations')
   @ApiBearerAuth('access-token')
   @UseGuards(AuthGuard('jwt') , GuideGuard)
   getReservations(@Request() req:any) {
     return this.guideService.getMyReservations(req.user.id);
   }

  @Patch()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt') , GuideGuard)
  update(@Request() req:any , @Body() updateGuideDto: UpdateGuideDto) {
    return this.guideService.update(req.user.id, updateGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guideService.remove(id);
  }
}
