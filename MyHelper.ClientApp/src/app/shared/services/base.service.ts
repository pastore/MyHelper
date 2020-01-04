
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IServerResponse } from '../models/base/server-response.model';
import { RequestMethod } from '../utilities/enums';

@Injectable()
export class BaseService {

  private _domain = environment.domain;
  private _routePrefix = 'api';
  private defaultApiVersion = 'v1';

  constructor(
    protected httpClient: HttpClient
  ) {}

  protected sendRequest<T>(
    method: RequestMethod,
    route: string,
    data?: any,
    headers?: HttpHeaders,
    params?: HttpParams,
    handleResponse?: (res: IServerResponse) => T
  ): Observable<T> {
    return this.httpClient.request<IServerResponse>(
      method,
      this._generateUrl(route),
      { body: data, headers: headers, params: params }
    ).pipe(
      map((response: IServerResponse) => {
        return handleResponse ? handleResponse(response) : response.result;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
    }));
  }

  protected generateSearchParams<T>(filter: T): HttpParams {
    let any = false;

    if (filter) {
      Object.keys(filter)
      .forEach(key => {
        if (filter[key]) {
          any = true;
        }
      });
    }

    return any ? new HttpParams({fromObject: filter as any }) : null;
  }

  private _generateUrl(route: string, apiVersion: string = this.defaultApiVersion): string {
    return this._domain + '/' + this._routePrefix + '/' + apiVersion + '/' + route;
  }
}
