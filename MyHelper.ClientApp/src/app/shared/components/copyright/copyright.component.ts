import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'mh-copyright',
  templateUrl: './copyright.component.html'
})
export class CopyrightComponent {
  buildVersion = environment.version;
  currentYear = (new Date()).getFullYear();

  constructor() { }
}
