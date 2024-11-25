import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { AboutComponent } from './ui/about/about.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardGuard, SignupOrLogin } from './route.guard';
import { FormComponent } from './ui/form/form.component';

export const routes: Routes = [
    { path: '', title: 'Home Page', component: HomeComponent },
    { path: 'about', title: 'About Page', component: AboutComponent },
    { path: 'signup', title: "Signup Page", component: FormComponent, canActivate: [SignupOrLogin] },
    { path: 'login', title: "Login Page", component: FormComponent, canActivate: [SignupOrLogin] },
    { path: 'dashboard', title: "Dashboard Page", component: DashboardComponent, canActivate: [DashboardGuard] },
    { path: '**', title: 'Page not found', component: PageNotFoundComponent }
];