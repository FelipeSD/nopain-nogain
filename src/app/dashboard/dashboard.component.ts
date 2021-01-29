import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './dashboard.media.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private titleService:Title
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle("Gym App | Dashboard");

  }
  
}
