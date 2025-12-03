import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLayout } from '../../shared/layouts/user-layout/user-layout';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('./pages/login/login').then(m => m.Login)
  },
  {
    path:'',
    component: UserLayout,
    children: [
      {
        path: 'home',
        loadComponent: ()=> import('./pages/home/home').then(m => m.Home)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
