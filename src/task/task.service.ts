import { Injectable } from '@nestjs/common';
import { CreateTaskDto, CreateTaskResponseDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async create(
    createTaskDto: CreateTaskDto,
    user_id: number,
  ): Promise<CreateTaskResponseDto> {
    const { id, name } = await this.taskRepo.save({
      ...createTaskDto,
      user_id,
    });
    return { task: { id, name } };
  }

  async findAllByUser(user_id: number): Promise<Task[]> {
    const tasks = await this.taskRepo.find({ where: { user_id } });
    return tasks;
  }
}
