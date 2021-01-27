import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

const routes: Routes = [
  {path: "", component: DashboardComponent, pathMatch: "full"},
  {path: "workout/new", component: WorkoutFormComponent},
  {path: "workout/delete/:id", component: WorkoutFormComponent},
  {path: "workout/update/:id", component: WorkoutFormComponent},
  {path: "workout/list", component: WorkoutListComponent},

  {path: "client/list", component: ClientListComponent},
  {path: "client/new", component: ClientFormComponent},
  {path: "client/update/:id", component: ClientFormComponent},
  {path: "client/delete/:id", component: ClientFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
