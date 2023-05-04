import { PartialType } from '@nestjs/swagger';

import { CreateUserPostDto } from './create-user-post.dto';

export class UpdateUserPostDto extends PartialType(CreateUserPostDto) {}
