import { Routes } from '@angular/router';
import { UserLayout } from '../../shared/layouts/user-layout/user-layout';
import { guestGuard } from '../../core/guards/guest-guard';

export const userRoutes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: '',
    component: UserLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
      },
      {
        path: 'ask-question',
        loadComponent: () => import('./pages/ask-qn/ask-qn').then(m => m.AskQn)
      },
      {
        path: 'question/:id',
        loadComponent: ()=> import('./pages/single-qn/single-qn').then(m => m.SingleQn)
      },
      {
        path: 'tags',
        loadComponent: () => import('./pages/tags/tags').then(m => m.Tags)
      },
      {
        path: 'tag-questions/:id',
        loadComponent:() => import('./pages/tag-questions/tag-questions').then(m => m.TagQuestions)
      },
      {
        path: 'profile',
        loadComponent:() => import('./pages/user-profile/user-profile').then(m => m.UserProfile)
      },
      {
        path: 'practice',
        loadComponent:()=> import('./pages/practice/practice').then(m => m.Practice)
      },
      {
        path: 'community',
        loadComponent: ()=> import('./pages/community-tab/community-tab').then(m => m.CommunityTab)
      },
      {
        path: 'community-view/:id',
        loadComponent: ()=> import('./pages/community-view/community-view').then(m => m.CommunityView)
      },{
        path: 'article-view/:id',
        loadComponent: ()=> import('./pages/article-view/article-view').then(m => m.ArticleView)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];