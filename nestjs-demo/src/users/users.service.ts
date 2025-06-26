import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { IUser } from 'src/types/users.type';

@Injectable()
export class UsersService {
  private user: IUser[] = [
    {
      id: '1',
      name: 'Leanne Graham',
      kia: true,
      worker: true,
      age: 1,
    },
    {
      id: '2',
      name: 'Ervin Howell',
      kia: false,
      worker: true,
      age: 12,
    },
    {
      id: '3',
      name: 'Clementine Bauch',
      kia: true,
      worker: false,
      age: 18,
    },
    {
      id: '4',
      name: 'Patricia Lebsack',
      kia: false,
      worker: false,
      age: 25,
    },
    {
      id: '5',
      name: 'Chelsey Dietrich',
      kia: true,
      worker: true,
      age: 30,
    },
  ];

  findAllUsers() {
    return this.user; //user trong class
  }

  findUsersWithQuery(worker?: boolean, kia?: boolean) {
    let result = this.user;

    if (worker !== undefined) {
      result = result.filter((item) => item.worker === worker);
    }

    if (kia !== undefined) {
      result = result.filter((item) => item.kia === kia);
    }
    return {
      params: {
        worker: worker,
        kia: kia,
      },
      results: result,
    };
  }

  findOneUser(userID: string) {
    const user = this.user.filter((item) => item.id === userID);
    if (user.length === 0)
      throw new NotFoundException('Are you sure this is the right ID?');
    return user;
  }
  findUserWithSameAge(age: number) {
    const user = this.user.filter((item) => item.age === age);
    if (user.length === 0)
      throw new NotFoundException(`We don't have any user at that age`);
    return user;
  }

  createUser(user: CreateUserDto) {
    const max = 20;
    const min = 10;
    const randomId = Math.random() * (max - min) + min;
    const newUser = {
      id: randomId.toString(),
      ...user,
    };
    this.user.push(newUser);
    return this.user;
  }

  updateUser(id: string, userUpdateData: UpdateUserDto) {
    const userNeedUpdate = this.user.filter((item) => item.id === id).pop();
    if (!userNeedUpdate) {
      return "We don't have any user with that id, check your param again";
    }
    return { ...userNeedUpdate, ...userUpdateData };
  }

  deleteUser(userID: string) {
    return this.user.filter((item) => item.id !== userID);
  }
}
