import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IServerResponse } from '../models/base/server-response.model';
import '../utilities/rxjs-operators';

@Injectable()
export class BaseService {

  private _domain = environment.domain;
  private _routePrefix = 'api';
  private _apiVersion = 'v1';

  constructor(private baseHttp: Http) { }

  protected sendRequest<T>(verb: RequestMethod,
                        route: string,
                        data?: any, headers?: any,
                        handleResponse?: (res: IServerResponse) => T ): Observable<T> {
        return this.baseHttp.request(new Request({
            method: verb, url: this._generateUrl(route), body: data, headers: headers
        }))
            .map((response: Response) => {
                return handleResponse ? handleResponse(response.json()) : response.json().result;
            })
            .catch((error: Response) => {
              return Observable.throw(error.json().message);
            });
    }

    private _generateUrl(route: string): string {
      return this._domain + '/' + this._routePrefix + '/' + this._apiVersion + '/' + route;
    }
}
