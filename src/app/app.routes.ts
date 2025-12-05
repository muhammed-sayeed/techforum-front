import { Routes } from '@angular/router';
import { Login } from './features/user/pages/login/login';
import { Register } from './features/user/pages/register/register';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./features/user/user-routing-module').then(m => m.userRoutes)
  },
//   {
//     path: 'admin',
//     loadChildren: () => import('./features/admin/admin-routing-module').then(m => m.adminRoutes)
//   },
  {
    path: '',
    redirectTo: 'user/home',
    pathMatch: 'full'
  }
];