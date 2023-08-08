import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { User } from '../entities/user.entity';
import { Exclude, Type } from 'class-transformer';

export class CreateUserBodyDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[@!#$%^&*])[a-zA-Z0-9@!#$%^&*]{8,}$/, {
    message:
      'Password must contain at least one number and one special character and minimum lenght of 8 characters',
  })
  @ApiProperty({
    type: String,
  })
  password: string;
}

export class UserResponseDto {
  @IsEmail()
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: Number,
  })
  id: number;
}
export class CreateUserResponseDto {
  @ApiProperty()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
