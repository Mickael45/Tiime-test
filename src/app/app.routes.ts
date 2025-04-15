import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from '@pages/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'detail/:id',
    component: UserDetailComponent,
  },
];
