import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Profile } from './modules/users/entities/profile.entity';
import { User } from './modules/users/entities/user.entity';
import { Post } from './modules/users/entities/post.entity';
import { Chat } from './socket/chat/entites/chat.entitiy';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'db_study_2',
  entities: [User, Profile, Post, Chat],
  synchronize: true,
};
