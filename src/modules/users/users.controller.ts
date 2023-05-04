import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -------------- start CRUD Users ------------------
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // -------------- end CRUD Users ------------------

  // -------------- start CRUD Profile ------------------

  @Post(':id/profile')
  createUserProfile(
    @Param('id') id: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfileDto(id, createUserProfileDto);
  }

  // -------------- end CRUD Profile ------------------

  // -------------- start CRUD Post ------------------

  @Post(':id/post')
  createUserPost(
    @Param('id') id: string,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPostDto(id, createUserPostDto);
  }

  // -------------- end CRUD Post ------------------
}
