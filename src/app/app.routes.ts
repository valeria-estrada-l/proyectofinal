import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'courses', component:CoursesComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'add', component:FormComponent}

];
