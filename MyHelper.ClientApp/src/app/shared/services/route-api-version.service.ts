import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class RouteApiVersionService {
  private _domain = environment.domain;
  private _routePrefix = 'api';
  private _apiVersion = 'v1';

  constructor() { }

  protected generateUrl(route: string): string {
    return this._domain + '/' + this._routePrefix + '/' + this._apiVersion + '/' + route;
  }
}
