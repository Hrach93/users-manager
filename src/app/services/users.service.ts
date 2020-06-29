import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Injectable()
export class UsersService extends CommonService {

  public createUser(user: User) {
    return this.post('users', user);
  }

  public getAll() {
    return this.get(`users`);
  }

  public getUser(id: number) {
    return this.get(`users/${id}`);
  }


  public editUser(id: number, data) {
    return this.put(`users/${id}`, data);
  }

  public deleteUser(id: number) {
    return this.delete(`users/${id}`);
  }

}
