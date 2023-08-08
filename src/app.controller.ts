import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {
  CreateUserBodyDto,
  CreateUserResponseDto,
  UserResponseDto,
} from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateTaskDto, ListTaskResponseDto } from './task/dto/create-task.dto';
import { TaskService } from './task/task.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Post('register')
  async register(
    @Request() req,
    @Body() body: CreateUserBodyDto,
  ): Promise<CreateUserResponseDto> {
    const created_user: CreateUserResponseDto = await this.userService.create(
      body,
    );
    return created_user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create-task')
  async createTask(@Request() req, @Body() body: CreateTaskDto) {
    const {
      user: {
        user: { id },
      },
    } = req;
    const task = await this.taskService.create(body, id);
    return task;
  }
  @UseGuards(JwtAuthGuard)
  @Get('list-tasks')
  async listTask(@Request() req): Promise<ListTaskResponseDto> {
    const {
      user: {
        user: { id },
      },
    } = req;
    const tasks = await this.taskService.findAllByUser(id);
    return { tasks };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
