export interface IImageRepository {
  uploadImage(data: { image: File; name: string }): Promise<boolean>;
  deleteImage(data: { name: string }): Promise<boolean>;
}
