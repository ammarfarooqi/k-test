import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateUserBodyDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(
    createUserDto: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    const { email } = createUserDto;
    const already_exist = await this.usersRepo.findOne({ where: { email } });
    if (already_exist) {
      throw new ConflictException('User Already Exist');
    } else {
      const { id, email } = await this.usersRepo.save({
        ...createUserDto,
      });
      return { user: { id, email } };
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersRepo.findOne({ where: { email } });
    return user;
  }
}
