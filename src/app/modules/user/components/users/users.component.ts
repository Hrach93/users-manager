import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public userData: User;
  public form: any;
  public editRowIndex: number;
  public checkedUsers: User[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {

  }

  ngOnInit() {
    this.getAllUsers();
  }

  public checkUser(event, user) {
    if (event.target.checked) {
      this.checkedUsers.push(user);
    } else {
      this.checkedUsers.splice(this.checkedUsers.indexOf(user), 1);
    }
  }

  public edit(user: User, index: number) {
    this.editRowIndex = index;
    this.buildForm(user);
  }


  buildForm(user: any = {}) {
    this.form = {
      name: new FormControl(user.name, Validators.required),
      username: new FormControl(user.username, Validators.required),
      email: new FormControl(user.email),
      phone: new FormControl(user.phone),
      website: new FormControl(user.website)
    };
  }

  public save(i: number) {
    let userData: any = {};
    Object.keys(this.form).forEach(key => {
      userData[key] = this.form[key].value;
    });
    this.usersService.editUser(this.users[i].id, userData).subscribe(res => {
      this.editRowIndex = null;
      this.users[i] = {...this.users[i], ...userData};
    });
  }

  public navigateToUser(user: User) {
    this.router.navigate([`/users/${user.id}/edit`]);
  }

  public getAllUsers() {
    this.usersService.getAll().subscribe(res => {
      this.users = res['body'];
    });
  }

  public bulkDelete() {
    this.checkedUsers.forEach((item) => {
      this.users.splice(this.users.indexOf(item), 1);
    });
    this.checkedUsers = [];
  }

  public delete(event: User, index: number) {
    this.usersService.deleteUser(event.id).subscribe(res => {
      this.users.splice(index, 1);
    });
  }
}
