import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../interface/client';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];

  constructor(
    public service: ClientService,
    private titleService:Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Client list");

    this.service.getAll().subscribe((res)=>{
      this.clients = res;
    });
  }

}
