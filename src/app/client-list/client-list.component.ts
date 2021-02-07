import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../interface/client';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  currentUser;

  constructor(
    public service: ClientService,
    private titleService:Title,
    private authService: AuthService
  ) {
    this.authService.currentAuthStatus.subscribe(authStatus => {
      this.currentUser = authStatus;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Client list");
    let userId = this.currentUser.uid;
    this.service.getAll(userId).subscribe((res)=>{
      this.clients = res;
    });
  }

}
