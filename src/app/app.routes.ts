import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { TasksComponent } from './components/tasks/tasks';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
