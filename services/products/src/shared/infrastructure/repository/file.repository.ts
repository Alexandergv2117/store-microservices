import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { IImageRepository } from 'src/shared/domain/interfaces/file.repository';
import {
  AWS_BUCKET_NAME_IMAGE,
  AWS_BUCKET_NAME_REGION,
  AWS_PUBLIC_KEY,
  AWS_SECRET_KEY,
} from '../env';

export class ImageRepository implements IImageRepository {
  private s3Client: S3Client;

  constructor() {
    console.log('AWS_BUCKET_NAME_REGION', AWS_BUCKET_NAME_REGION);
    this.s3Client = new S3Client({
      region: AWS_BUCKET_NAME_REGION,
      credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
    });
  }

  async uploadImage({
    image,
    name,
  }: {
    image: Express.Multer.File;
    name: string;
  }): Promise<boolean> {
    try {
      const params = {
        Bucket: AWS_BUCKET_NAME_IMAGE,
        Key: name,
        Body: image.buffer,
      };
      await this.s3Client.send(new PutObjectCommand(params));
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteImage({ name }: { name: string }): Promise<boolean> {
    try {
      const params = {
        Bucket: AWS_BUCKET_NAME_IMAGE,
        Key: name,
      };

      await this.s3Client.send(new DeleteObjectCommand(params));
      return true;
    } catch (error) {
      return false;
    }
  }
}
