import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import firebase from 'firebase/app';

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
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

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
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
