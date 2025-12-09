import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { TasksComponent } from './components/tasks/tasks';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: '' }
];
