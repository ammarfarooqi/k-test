import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBodyDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserBodyDto) {}
