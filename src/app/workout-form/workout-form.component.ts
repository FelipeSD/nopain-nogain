import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../service/workout.service';
import { WorkoutList } from '../interface/workoutList';
import { Location } from '@angular/common';
import { Client } from '../interface/client';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  
  clientList: Client[];

  constructor(
    private router: Router,
    public service: WorkoutService,
    public clientService:  ClientService,
    private activatedRoute: ActivatedRoute,
    private local: Location
  ) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe((res)=>{
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
    this.service.create(objForm).subscribe((res)=>{
      this.workoutForm.reset();
      alert("New workout successfuly added");
    });
  }

  updateWorkout(id: string, objForm: WorkoutList){
    this.service.update(id, objForm).subscribe((res)=>{
      this.workoutForm.reset();
      console.log(objForm.owner)
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

  getWorkout(id: string){
    this.service.get(id).subscribe((res)=>{

      for(let elem in res){
        let formElement = this.workoutForm.get(elem);
        if(formElement){
          formElement.setValue(res[elem])
        }
      }
    });
  }

}
