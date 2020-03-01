import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { FriendFilterRequest } from '../models/friend/friend-filter-request.model';
import { AppUserViewModel } from '../models/user/app-user-view.model';
import { ApiRoute } from '../utilities/api-route';
import { FriendRequestFlag, RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class FriendService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient, authService);
  }

  getFriends(route, friendFilterRequest?: FriendFilterRequest, isLoader = true): Observable<AppUserViewModel[]> {
    const searchParams = this.generateSearchParams(friendFilterRequest);
    const headers = this.generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<AppUserViewModel[]>(RequestMethod.Get, route, null, headers, searchParams)
    .pipe(finalize(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    }));
  }

  inviteFriend(personId): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Friends, personId, headers);
  }

  cancelFriend(personId): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Friends, personId, headers);
  }

  deleteFriend(personId): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Friends, personId, headers);
  }

  updateFriendRequest(personId, friendRequestFlag: FriendRequestFlag): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Patch, ApiRoute.Friends + '/' + personId, friendRequestFlag, headers);
  }
}
