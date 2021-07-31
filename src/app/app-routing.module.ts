import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},

  {path: 'workout/new', component: WorkoutFormComponent,  canActivate: [AuthGuard]},
  {path: 'workout/delete/:id', component: WorkoutFormComponent,  canActivate: [AuthGuard]},
  {path: 'workout/update/:id', component: WorkoutFormComponent,  canActivate: [AuthGuard]},
  {path: 'workout/list', component: WorkoutListComponent,  canActivate: [AuthGuard]},

  {path: 'client/list', component: ClientListComponent,  canActivate: [AuthGuard]},
  {path: 'client/new', component: ClientFormComponent,  canActivate: [AuthGuard]},
  {path: 'client/update/:id', component: ClientFormComponent,  canActivate: [AuthGuard]},
  {path: 'client/delete/:id', component: ClientFormComponent,  canActivate: [AuthGuard]},

  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
