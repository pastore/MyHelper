import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IServerResponse } from '../models/base/server-response.model';
import '../utilities/rxjs-operators';
import { RouteApiVersionService } from './route-api-version.service';

@Injectable()
export class BaseService extends RouteApiVersionService {
  constructor(private baseHttp: Http) {
    super();
   }

  protected sendRequest<T>(
    verb: RequestMethod,
    route: string,
    data?: any,
    headers?: any,
    searchParams?: URLSearchParams,
    handleResponse?: (res: IServerResponse
  ) => T ): Observable<T> {
    return this.baseHttp.request(new Request({
        method: verb, url: this.generateUrl(route), body: data, headers: headers, params: searchParams
    }))
      .map((response: Response) => {
        const body = response.json();
        return handleResponse ? handleResponse(body) : body.isSuccess
                              ? (body.result ? body.result : body.isSuccess) : Observable.throw(body.message);
      })
      .catch((error: Response) => {
        return Observable.throw(error.json().message);
      });
  }

  protected generateSearchParams<T>(filter: T): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams;
    let any = false;

    if (filter) {
      Object.keys(filter)
      .forEach(key => {
        if (filter[key]) {
          any = true;
          if (Array.isArray(filter[key])) {
            Object.keys(filter[key])
            .forEach(index => {
              params.append(key, filter[key][index]);
            });
          } else {
            params.append(key, filter[key]);
          }
        }
      });
    }

    return any ? params : null;
  }
}
