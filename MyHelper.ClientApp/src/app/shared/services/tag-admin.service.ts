import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagAdminModel } from '../models/tags/tag-admin.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class TagAdminService extends BaseService {
  private headers: HttpHeaders;

  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService
    ) {
    super(httpClient);
    this._generateAuthHeaders();
  }

  getTags(): Observable<TagAdminModel[]> {
    return this.sendRequest<TagAdminModel[]>(RequestMethod.Get, ApiRoute.AdminTags, null, this.headers);
  }

  deleteTag(id: number): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.AdminTags + '/' + id, null, this.headers);
  }

  private _generateAuthHeaders() {
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}

