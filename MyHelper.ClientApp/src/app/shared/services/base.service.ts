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
import { RouteApiVersionService } from './route-api-version.service';

@Injectable()
export class BaseService extends RouteApiVersionService {
  constructor(protected httpClient: HttpClient) {
    super();
   }

  protected sendRequest<T>(
    verb: RequestMethod,
    route: string,
    data?: any,
    headers?: HttpHeaders,
    searchParams?: HttpParams,
    handleResponse?: (res: IServerResponse) => T
  ): Observable<T> {
    return this.httpClient.request<IServerResponse>(
      verb,
      this.generateUrl(route),
      { body: data, headers: headers, params: searchParams }
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
    const params: HttpParams = new HttpParams;
    let any = false;

    if (filter) {
      Object.keys(filter)
      .forEach(key => {
        if (filter[key]) {
          any = true;
          if (Array.isArray(filter[key])) {
            Object.keys(filter[key])
            .forEach(index => {
              params.set(key, filter[key][index]);
            });
          } else {
            params.set(key, filter[key]);
          }
        }
      });
    }

    return any ? params : null;
  }
}
