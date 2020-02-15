import { Component, OnInit } from '@angular/core';
import '../../../../shared/utilities/string-helper';
import { SidebarLink } from '../../../../shared/models/base/sidebar-link.model';
import { ApiRoute } from '../../../../shared/utilities/api-route';
import { Icons } from '../../../../shared/utilities/enums';

@Component({
  selector: 'mh-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  sidebarLinks: SidebarLink[] = [];

  constructor() { }

  ngOnInit() {
    this._initSidebarLinks();
  }

  private _initSidebarLinks() {
    const adminTags = new SidebarLink(ApiRoute.AdminTags, Icons.Label);
    const adminUsers = new SidebarLink(ApiRoute.AdminUsers, Icons.People);

    this.sidebarLinks.push(... [adminTags, adminUsers]);
  }

}
