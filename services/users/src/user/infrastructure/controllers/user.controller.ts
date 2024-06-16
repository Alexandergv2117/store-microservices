import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { PaginationDTO } from 'src/shared/application/dto/pagination.dto';
import { SearchDTO } from 'src/shared/application/dto/search.dto';
import { ICreateUserService } from 'src/user/application/services/create/create.interface';
import { CreateUserService } from 'src/user/application/services/create/create.service';
import { IDeleteUserService } from 'src/user/application/services/delete/delete.interface';
import { DeleteUserService } from 'src/user/application/services/delete/delete.service';
import { IGetUserService } from 'src/user/application/services/get/get.interface';
import { GetUserService } from 'src/user/application/services/get/get.service';
import { IUpdateUserService } from 'src/user/application/services/update/update.interface';
import { UpdateUserService } from 'src/user/application/services/update/update.service';
import { CreateUserDto } from 'src/user/application/dto/create.dto';
import { GetIdUserDTO } from 'src/user/application/dto/get.dto';
import { UpdateUserDTO } from 'src/user/application/dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypePipe } from 'src/shared/application/pipes/files.validator.pipe';
import { validImg } from 'src/shared/infrastructure/utils/validFiles';

@Controller('')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createService: ICreateUserService,
    @Inject(GetUserService)
    private readonly getService: IGetUserService,
    @Inject(UpdateUserService)
    private readonly updateService: IUpdateUserService,
    @Inject(DeleteUserService)
    private readonly deleteService: IDeleteUserService,
  ) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() newUser: CreateUserDto,
    @UploadedFile(new FileTypePipe(validImg.extensions, validImg.mimeTypes))
    image: Express.Multer.File,
  ) {
    return await this.createService.create({
      ...newUser,
      role: 'admin',
      image,
    });
  }

  @Post('public')
  async createUserPublic(@Body() newUser: CreateUserDto) {
    return await this.createService.create({
      ...newUser,
      role: 'admin',
    });
  }

  @Get('')
  async getAll(@Query() pagination: PaginationDTO, @Query() search: SearchDTO) {
    const user = await this.getService.getAll({ ...pagination, ...search });

    return {
      data: {
        user: user.data,
      },
      total: user.total,
    };
  }

  @Get(':id')
  async getOne(@Param() { id }: GetIdUserDTO) {
    return await this.getService.getOneById({ id });
  }

  @Put(':id')
  async updateOne(
    @Param() { id }: GetIdUserDTO,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return await this.updateService.updateOne({ id, user: updateUser });
  }

  @Delete(':id')
  async deleteOne(@Param() { id }: GetIdUserDTO) {
    return await this.deleteService.deleteOne({ id });
  }
}
