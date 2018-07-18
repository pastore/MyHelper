import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendSearchService {
 private friendSearchValue = new Subject<string>();

  constructor() { }

  getFriendSearch(): Observable<string> {
    return this.friendSearchValue.asObservable();
  }

  sharedFriendSearch(searchValue: string) {
    this.friendSearchValue.next(searchValue);
  }
}
