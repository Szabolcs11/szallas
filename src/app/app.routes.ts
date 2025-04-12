import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccommodationDetailComponent } from './pages/accommodation-detail/accommodation-detail.component';
import { LoginRegisterGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRegisterGuard],
  },
  { path: 'accommodation/:id', component: AccommodationDetailComponent },
];
