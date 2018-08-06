import { Component, HostListener, OnInit } from '@angular/core';
import { FriendSearchService } from '../../shared/services/friend-search.service';

@Component({
  selector: 'mh-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  screenWidth: number;
  searchPlaceholder = 'Search friends';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth =  window.innerWidth;
  }

  constructor(
    private _friendSearchService: FriendSearchService
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  triggerChangeSearch(search) {
    this._friendSearchService.sharedFriendSearch(search);
  }
}
