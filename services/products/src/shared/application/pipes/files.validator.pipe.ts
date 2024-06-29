import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FileTypePipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  constructor(
    private readonly validExtensions: string[],
    private readonly validContentTypes: string[],
  ) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      return null;
    }
    const fileExtensions = file.originalname.split('.');
    const lastFileExtension =
      fileExtensions[fileExtensions.length - 1].toLowerCase();

    if (!this.validExtensions.includes(lastFileExtension)) {
      throw new UnprocessableEntityException(
        'INVALID_FILE_EXTENSION: ENTITY: ' + file.originalname,
      );
    }

    const uintArray = new Uint8Array(file.buffer);
    const bytes: string[] = [];

    uintArray.forEach((uint) => bytes.push(uint.toString(16)));

    const hex = bytes.join('').toUpperCase();
    const mimeType = getMimeType(hex.substring(0, 8));

    if (!this.validContentTypes.includes(mimeType)) {
      throw new UnprocessableEntityException(
        'INVALID_CONTENT_TYPE: ENTITY: ' + file.originalname,
      );
    }

    return {
      ...file,
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: mimeType,
    };
  }
}

function getMimeType(signature: string): string | undefined {
  switch (signature) {
    case '89504E47':
      return 'image/png';
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFE2':
    case 'FFD8FFDB':
      return 'image/jpeg';
    case '52494646':
      return 'image/webp';
    case '25504446':
      return 'application/pdf';
    default:
      return undefined;
  }
}
