import { Component, OnInit } from '@angular/core';
import { ApiRoute } from '../../../../shared/app-settings/api-route';
import { SidebarLink } from '../../../../shared/models/system/sidebar-link.model';

@Component({
  selector: 'mh-system-sidebar',
  templateUrl: './system-sidebar.component.html',
  styleUrls: ['./system-sidebar.component.scss']
})
export class SystemSidebarComponent implements OnInit {

  sidebarLinks: SidebarLink[] = [];

  constructor() { }

  ngOnInit() {
    this._initSidebarLinks();
  }

  private _initSidebarLinks() {
    const notes = new SidebarLink(ApiRoute.Notes);
    this.sidebarLinks.push(... [notes]);
  }
}
