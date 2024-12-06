import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => 
      import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./components/callback/auth-callback.component').then(c => c.AuthCallbackComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { } 