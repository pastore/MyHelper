import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IServerResponse } from '../models/base/server-response.model';
import { ApiRoute } from '../utilities/api-route';
import { AuthenticationService } from './authentication.service';
import { DataAPIService } from './data-api.service';
import { TagAdminModel } from '../models/tags/tag-admin.model';
import { RequestMethod } from '../utilities/enums';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class TagAdminService extends BaseService{

  private headers: HttpHeaders;
  
  getTags() : Observable<TagAdminModel[]> {
    console.log(this._generateUrl(ApiRoute.AdminTags))
    return this.sendRequest<TagAdminModel[]>(RequestMethod.Get, ApiRoute.AdminTags, null, this.headers);
  }

  protected get apiUrl(): string {
    return ApiRoute.AdminTags;
  }

  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService
    ) {
    super(httpClient);
    this._generateAuthHeaders(); 
  }

  deleteTag(id: number): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.AdminTags + '/' + id, null, this.headers);
  }

  protected handleData(response: IServerResponse): TagAdminModel[] {
    return response.result as TagAdminModel[];
  }

  private _generateAuthHeaders() {
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }

}

