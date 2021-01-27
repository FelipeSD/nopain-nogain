import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../interface/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];

  constructor(public service: ClientService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((res)=>{
      this.clients = res;
    });
  }

}
