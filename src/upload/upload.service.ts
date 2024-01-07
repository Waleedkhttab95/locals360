import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    try {
      const fileNameCode = `${uuidv4()}-${fileName}`;
      const encodeFileName = encodeURIComponent(fileNameCode);
      const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: file,
        }),
      );

      return `https://${bucketName}.s3.amazonaws.com/${encodeFileName}`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
