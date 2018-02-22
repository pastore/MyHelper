import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'mh-system',
  templateUrl: 'system.component.html',
  styleUrls: ['./system.component.scss']
})

export class SystemComponent {
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  constructor() {
    this.screenWidth = window.innerWidth;
  }
}
