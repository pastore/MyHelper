import { Component, OnInit } from '@angular/core';
import { ApiRoute } from '../../../../shared/utilities/api-route';
import { SidebarLink } from '../../../../shared/models/base/sidebar-link.model';
import '../../../../shared/utilities/string-helper';
import { Icons } from '../../../../shared/utilities/enums';

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
    const notes = new SidebarLink(ApiRoute.Notes, Icons.Note);
    const tasks = new SidebarLink(ApiRoute.Tasks, Icons.Schedule);
    const friends = new SidebarLink(ApiRoute.Friends, Icons.People);

    this.sidebarLinks.push(... [notes, tasks, friends]);
  }
}
