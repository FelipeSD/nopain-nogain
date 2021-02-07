import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Client } from '../interface/client';
import { WorkoutList } from '../interface/workoutList';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  findClientForm: FormGroup;

  selectedClient: Client;
  workoutList: WorkoutList[];

  clientList: Client[];
  currentUser;

  constructor(
    private route: ActivatedRoute,
    public clientService :ClientService, 
    private titleService:Title,
    private authService: AuthService
  ) {
    this.authService.currentAuthStatus.subscribe(authStatus => {
      this.currentUser = authStatus;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Workout list");

    this.findClientForm = new FormGroup({
      owner: new FormControl('')
    });
    
    let userId = this.currentUser.uid;

    this.clientService.getAll(userId).subscribe((res)=>{
      this.clientList = res;

      let clientId = this.route.snapshot.paramMap.get("client");
      if(clientId){
        this.findClientForm.get("owner").setValue(clientId);
        this.onChange(clientId);
      }
    });
  }

  onChange(value : string){
    this.selectedClient = null;
    this.workoutList = [];

    let userId = this.currentUser.uid;

    this.clientService.get(userId, value).subscribe((res: Client)=>{
      this.selectedClient = res;
      this.clientService.getWorkoutList(userId, res._id).subscribe((workoutRes)=>{
        this.workoutList = workoutRes;
      });
    });
  }

}
