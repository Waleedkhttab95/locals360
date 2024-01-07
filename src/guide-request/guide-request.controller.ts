import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request } from '@nestjs/common';
import { GuideRequestService } from './guide-request.service';
import { CreateGuideRequestDto } from './dto/create-guide-request.dto';
import { UpdateGuideRequestDto } from './dto/update-guide-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GuideRequestResDto } from './dto/guide-requestRes.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('guide-request')
@Controller('guide-request')
export class GuideRequestController {
  constructor(private readonly guideRequestService: GuideRequestService) {}

  @Serialize(GuideRequestResDto)
  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt') )
  create(@Body() createGuideRequestDto: CreateGuideRequestDto ,
  @Request() req) {
    createGuideRequestDto.guideId = req.user.id;
    return this.guideRequestService.create(createGuideRequestDto);
  }

  @Get()
  findAll() {
    return this.guideRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guideRequestService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateGuideRequestDto: UpdateGuideRequestDto) {
    return this.guideRequestService.update(+id, updateGuideRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guideRequestService.remove(+id);
  }
}
