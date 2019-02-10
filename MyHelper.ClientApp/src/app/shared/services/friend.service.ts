import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { LoaderService } from '../loader/loader.service';
import { AppUserViewModel } from '../models/user/app-user-view.model';
import { RequestMethod, FriendRequestFlag } from '../utilities/enums';
import { FriendFilterRequest } from '../models/friend/friend-filter-request.model';
import { ApiRoute } from '../utilities/api-route';

@Injectable()
export class FriendService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
  }

  getFriends(route, friendFilterRequest?: FriendFilterRequest, isLoader = true): Observable<AppUserViewModel[]> {
    const searchParams = this.generateSearchParams(friendFilterRequest);
    const headers = this._generateAuthHeaders();
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
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Friends, personId, headers);
  }

  cancelFriend(personId): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Friends, personId, headers);
  }

  deleteFriend(personId): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Friends, personId, headers);
  }

  updateFriendRequest(personId, friendRequestFlag: FriendRequestFlag): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Patch, ApiRoute.Friends + '/' + personId, friendRequestFlag, headers);
  }

  private _generateAuthHeaders(): HttpHeaders {
    const token = this._authService.currentUser ? this._authService.token : '';
    return new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}
