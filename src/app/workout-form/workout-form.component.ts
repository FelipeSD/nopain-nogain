import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../service/workout.service';
import { WorkoutList } from '../interface/workoutList';
import { Location } from '@angular/common';
import { Client } from '../interface/client';
import { ClientService } from '../service/client.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  
  clientList: Client[];
  currentUser;

  constructor(
    private router: Router,
    public service: WorkoutService,
    public clientService:  ClientService,
    private activatedRoute: ActivatedRoute,
    private local: Location,
    private titleService:Title,
    private authService: AuthService

  ) {
    this.authService.currentAuthStatus.subscribe(authStatus => {
      this.currentUser = authStatus;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Workout form");
    
    let userId = this.currentUser.uid;

    this.clientService.getAll(userId).subscribe((res)=>{
      this.clientList = res;
    })

    if(/delete/gi.test(this.router.url)){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.deleteWorkout(id);
      });
    }else{ // add and updated
      this.workoutForm = new FormGroup({
        exercise: new FormControl(''),
        weight: new FormControl(), // kg
        repetition: new FormControl(), //int - how many times until stop
        restTime: new FormControl(),// seconds - allow the muscle to recover - usually in the range of 30 seconds to two minutes
        sets: new FormControl(), // int - series of repetitions to complete the exercise
        frequency: new FormControl(),
        notes: new FormControl(),
        owner: new FormControl(),
      });

      if(/update/gi.test(this.router.url)){
        this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.getWorkout(id);
        });
      }
    }
    
  }

  onSubmit(e){
    let formValue = this.workoutForm.value;

    // validate form
    if(formValue["exercise"] && formValue["owner"]){

      // check action
      if(/update/gi.test(this.router.url)){
        formValue.userId = this.currentUser.uid;

        this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.updateWorkout(id, formValue);
        });

      }else if(/new/gi.test(this.router.url)){

        this.addWorkout(formValue);

      }

    }else{
      alert("Please, fill out the exercise name and select a trainer (required)");
    }
  }

  addWorkout(objForm: WorkoutList){
    if(this.currentUser && this.currentUser.uid){
      let data = {
        "userId": this.currentUser.uid,
        ...objForm,
      };
      this.service.create(data).subscribe((res)=>{
        this.workoutForm.reset();
        alert("New workout successfuly added");
      });
    }
  }

  updateWorkout(id: string, objForm: WorkoutList){
    console.log(objForm);
    this.service.update(id, objForm).subscribe((res)=>{
      this.workoutForm.reset();
      alert("Workout successfuly updated");
      this.router.navigate(['workout/list', {"client": objForm.owner}]);
    });
  }

  deleteWorkout(id: string){
    this.service.delete(id).subscribe((res)=>{
      alert("Workout successfuly deleted");
      this.local.back();
    });
  }

  getWorkout(workoutId: string){
    let userId = this.currentUser.uid;
    
    this.service.get(userId, workoutId).subscribe((res)=>{

      for(let elem in res){
        let formElement = this.workoutForm.get(elem);
        if(formElement){
          formElement.setValue(res[elem])
        }
      }
    });
  }

}
