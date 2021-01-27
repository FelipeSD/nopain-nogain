import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { RouterModule } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MeasurePipe } from './measure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkoutFormComponent,
    ClientFormComponent,
    WorkoutListComponent,
    ClientListComponent,
    MeasurePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
