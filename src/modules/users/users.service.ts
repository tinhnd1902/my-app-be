import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (user) return 'User already exists';
    const newUser = await this.userRepository.create({
      ...createUserDto,
      createAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: ['profile', 'post'] });
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({
      user_id: id,
    });
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
    return this.userRepository.find();
  }

  //-----------------------------------
  async createUserProfileDto(
    id: string,
    createUserProfileDetails: CreateUserProfileDto,
  ) {
    const user = await this.userRepository.findOneBy({
      user_id: id,
    });
    if (!user)
      throw new HttpException(
        'User Not Found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newUserProfile = this.profileRepository.create({
      ...createUserProfileDetails,
      createAt: new Date(),
    });
    user.profile = await this.profileRepository.save(newUserProfile);
    await this.userRepository.save(user);
    return await this.userRepository.find({
      where: { user_id: id },
      relations: ['profile'],
    });
  }

  //-------------------------------------

  async createUserPostDto(
    id: string,
    createUserPostDetails: CreateUserPostDto,
  ) {
    const user = await this.userRepository.findOneBy({
      user_id: id,
    });
    if (!user)
      throw new HttpException(
        'User Not Found. Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newUserPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    await this.postRepository.save(newUserPost);
    return await this.userRepository.find({
      where: { user_id: id },
      relations: ['post'],
    });
  }
}
