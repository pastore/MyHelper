import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'mh-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  constructor() {
    this.screenWidth = window.innerWidth;
  }

}
