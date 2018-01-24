import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IServerResponse } from '../models/base/server-response.model';
import '../utilities/rxjs-operators';
import { RouteApiVersionService } from './route-api-version.service';

@Injectable()
export class BaseService extends RouteApiVersionService {
  constructor(private baseHttp: Http) {
    super();
   }

  protected sendRequest<T>(verb: RequestMethod,
                        route: string,
                        data?: any,
                        headers?: any,
                        handleResponse?: (res: IServerResponse) => T ): Observable<T> {
    return this.baseHttp.request(new Request({
        method: verb, url: this.generateUrl(route), body: data, headers: headers
    }))
      .map((response: Response) => {
          const body = response.json();
          return handleResponse ? handleResponse(body) : body.isSuccess ? body.result : Observable.throw(body.message);
      })
      .catch((error: Response) => {
        return Observable.throw(error.json().message);
      });
  }
}
