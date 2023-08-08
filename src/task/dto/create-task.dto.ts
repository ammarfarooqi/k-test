import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;
}
export class ListTaskResponseDto {
  @ApiProperty()
  tasks: Task[];
}

export class TaskResponseDto {
  name: string;
  id: number;
}

export class CreateTaskResponseDto {
  @ApiProperty()
  task: TaskResponseDto;
}
