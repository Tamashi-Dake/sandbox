import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types/users.type';

@Injectable()
export class UsersService {
  private user: IUser[] = [
    {
      id: '1',
      name: 'Leanne Graham',
      kia: true,
      worker: true,
    },
    {
      id: '2',
      name: 'Ervin Howell',
      kia: false,
      worker: true,
    },
    {
      id: '3',
      name: 'Clementine Bauch',
      kia: true,
      worker: false,
    },
    {
      id: '4',
      name: 'Patricia Lebsack',
      kia: false,
      worker: false,
    },
    {
      id: '5',
      name: 'Chelsey Dietrich',
      kia: true,
      worker: true,
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
    return this.user.filter((item) => item.id === userID);
  }

  createUser(user: Omit<IUser, 'id'>) {
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

  updateUser(id: string, userUpdateData: Omit<IUser, 'id'>) {
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
