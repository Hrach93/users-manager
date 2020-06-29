import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Routes, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CreateUserComponent } from './components/create-user/create-user.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: 'users/create',
        component: CreateUserComponent
      },
      {
        path: 'users/:id/edit',
        component: CreateUserComponent
      }
  ]
  }
];

@NgModule({
    declarations: [
      UsersComponent,
      CreateUserComponent,
      LayoutComponent
    ],
    imports: [
      SharedModule,
      RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [UsersService],
    bootstrap: []
  })
export class UserModule { }
