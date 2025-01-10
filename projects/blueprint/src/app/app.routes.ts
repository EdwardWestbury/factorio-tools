import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/home/home.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
