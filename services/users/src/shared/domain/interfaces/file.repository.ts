export interface IImageRepository {
  uploadImage(data: {
    image: Express.Multer.File;
    name: string;
  }): Promise<boolean>;
  deleteImage(data: { name: string }): Promise<boolean>;
}
