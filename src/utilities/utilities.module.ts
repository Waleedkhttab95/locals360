import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UtilitiesController],
  providers: [UtilitiesService],
  imports: [ MulterModule.register({
    dest: './uploads', // specify the destination directory for temporary storage
  }),],
  exports:[UtilitiesService]

})
export class UtilitiesModule {}
