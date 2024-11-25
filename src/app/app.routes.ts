import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { AboutComponent } from './ui/about/about.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { LoginComponent } from './ui/login/login.component';
import { SignupComponent } from './ui/signup/signup.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardGuard, SignupOrLogin } from './route.guard';

export const routes: Routes = [
    { path: '', title: 'Home Page', component: HomeComponent },
    { path: 'about', title: 'About Page', component: AboutComponent },
    { path: 'signup', title: "Signup Page", component: SignupComponent, canActivate: [SignupOrLogin] },
    { path: 'login', title: "Login Page", component: LoginComponent, canActivate: [SignupOrLogin] },
    { path: 'dashboard', title: "Dashboard Page", component: DashboardComponent, canActivate: [DashboardGuard] },
    { path: '**', title: 'Page not found', component: PageNotFoundComponent }
];