import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
  // NOTE: controller contain routes:
  // GET /users
  // POST /users/...

  constructor(private readonly usersService: UsersService) {}
  @Get() // trỏ về default route ở trên nếu không có đối số
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('params') // nếu có query param => /users?worker=true&kia=false...
  findUsersWithQuery(
    @Query('worker') workerParam?: string, // param luôn là string
    @Query('kia') kiaParam?: string,
  ) {
    // Chuyển đổi từ string sang boolean
    const worker = workerParam === 'true'; // chuyển 'true' thành true và 'false' thành false
    const kia = kiaParam === 'true';

    return this.usersService.findUsersWithQuery(worker, kia);
  }
  @Get('age/:age')
  //Pipe: có thể dùng để tranform hoặc validate
  findUserWithSameAge(@Param('age', ParseIntPipe) age: number) {
    return this.usersService.findUserWithSameAge(age);
  }

  @Get(':id') // GET /users/:id
  findOneUser(@Param('id') id: string) {
    //NOTE có thể truyền findOneUser(+id) - Unary plus => tự chuyển string thành số
    return this.usersService.findOneUser(id); // {id: <id>}
  }

  // NOTE: Static route CÙNG LOẠI sẽ bị override bởi dynamic route ở trên theo waterfall
  // => nếu có static route thì đặt trước dynamic route
  @Get('worker') // => GET /users/:id = worker
  findAllWorkers() {
    return []; // { id: worker}
  }

  // Có thể validate data khi tạo/sửa bằng DTO = Data tranfer object (schema)
  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
