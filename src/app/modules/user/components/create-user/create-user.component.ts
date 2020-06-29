import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { User, Address } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public form: FormGroup;
  public editMode = false;
  public userData: User;
  public userId: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.userId = this.activatedRoute.snapshot.params.id;
    this.editMode = !!this.userId;
    if (this.editMode) {
      this.getUser();
    }
  }

  initForm(user: any = {}) {
    this.form = this.fb.group({
      name: [user.name, [Validators.required]],
      username: [user.type, Validators.required],
      email: [user.email],
      phone: [user.phone],
      website: [user.website],
      address: this.fb.group({
        city: [user.address && user.address.city],
        suite: [user.address && user.address.suite],
        street: [user.address && user.address.street],
        zipcode: [user.address && user.address.zipcode],
      })
    });
  }

  public getUser() {
    this.usersService.getUser(this.userId).subscribe(res => {
      this.userData = res['body'];
      this.form.patchValue(this.userData);
    });
  }


  public submit() {
    if (this.form.invalid) return;

    if (this.editMode) {
      return this.usersService.editUser(this.userData.id, this.form.value).subscribe(res => {
        this.router.navigate(['']);
      });
    }
    this.usersService.createUser(this.form.value).subscribe((res) => {
      this.router.navigate(['']);
    });
  }
}
