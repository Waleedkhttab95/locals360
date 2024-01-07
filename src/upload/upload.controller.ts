import {
    Controller,
    FileTypeValidator,
    HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';
  import { ConfigService } from '@nestjs/config';

  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService
      ,private readonly configService: ConfigService) {}
  
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(
      @UploadedFiles()
      files: Array<Express.Multer.File>,
    ) {
    
      const uploadPromises = files.map(async (file) =>
       this.uploadService.upload(file.originalname, file.buffer)
    );
     return Promise.all(uploadPromises)
    }
  }