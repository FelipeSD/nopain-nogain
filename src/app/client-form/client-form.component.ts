import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../interface/client';
import { Location } from '@angular/common';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  
  constructor(
    private router: Router,
    public service: ClientService,
    private activatedRoute: ActivatedRoute,
    private local: Location,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Client form");

    if(/delete/gi.test(this.router.url)){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.deleteClient(id);
      });
    }else{ // add and updated
      this.clientForm = new FormGroup({
        name: new FormControl(''),
        weight: new FormControl(),
        age: new FormControl(), 
        height: new FormControl(),
        gender: new FormControl()
      });

      if(/update/gi.test(this.router.url)){
        this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.getClient(id);
        });
      }
    }
  }

  onSubmit(e){
    let formValue = this.clientForm.value;

    // validate form
    if(formValue["name"]){

      // check action
      if(/update/gi.test(this.router.url)){

        this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.updateClient(id, formValue);
        });

      }else if(/new/gi.test(this.router.url)){

        this.addClient(formValue);

      }

    }else{
      alert("Please, fill out the client's name (required)");
    }
  }

  addClient(objForm: Client){
    this.service.create(objForm).subscribe((res)=>{
      this.clientForm.reset();
      alert("New client successfuly added");
    });
  }

  updateClient(id: string, objForm: Client){
    this.service.update(id, objForm).subscribe((res)=>{
      this.clientForm.reset();
      alert("Client successfuly updated");
      this.router.navigate(['client/list']);
    });
  }

  deleteClient(id: string){
    this.service.delete(id).subscribe((res)=>{
      alert("Client successfuly deleted");
      this.local.back();
    });
  }

  getClient(id: string){
    this.service.get(id).subscribe((res)=>{

      for(let elem in res){
        let formElement = this.clientForm.get(elem);
        if(formElement){
          formElement.setValue(res[elem])
        }
      }
    });
  }
}
