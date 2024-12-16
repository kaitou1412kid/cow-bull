import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';

export const routes: Routes = [
  {
    path : "",
    component: HomeComponent
  },
  {
    path : "room/:id",
    component: CreateComponent
  }
];
