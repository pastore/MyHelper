import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
 } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IServerResponse } from '../models/base/server-response.model';
import '../utilities/rxjs-operators';
import { RequestMethod } from '../utilities/enums';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseService {

  private _domain = environment.domain;
  private _routePrefix = 'api';
  private defaultApiVersion = 'v1';

  constructor(protected httpClient: HttpClient) {}

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
    )
    .map((response: IServerResponse) => {
      const body = response;
      return handleResponse
        ? handleResponse(body) : body.isSuccess
        ? (body.result ? body.result : body.isSuccess) : Observable.throw(body.message);
    })
    .catch((error: HttpErrorResponse) => {
      return Observable.throw(error.message);
    });
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
