
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
 } from '@angular/common/http';
import { IServerResponse } from '../models/base/server-response.model';
import { RequestMethod } from '../utilities/enums';
import { environment } from '../../../environments/environment';

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
        const body = response;
        return handleResponse
          ? handleResponse(body) : body.isSuccess
          ? (body.result ? body.result : body.isSuccess) : observableThrowError(body.message);
      }),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.message);
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
