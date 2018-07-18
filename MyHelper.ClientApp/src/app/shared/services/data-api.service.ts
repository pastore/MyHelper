import {
  HttpClient,
  HttpHeaders
 } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import '../utilities/rxjs-operators';
import { AuthenticationService } from './authentication.service';
import { IServerResponse } from '../models/base/server-response.model';
import { environment } from '../../../environments/environment';

export abstract class DataAPIService<T> {

  protected abstract get apiUrl(): string;
  private cache: ReplaySubject<T[]>;
  private isPristine = true;
  private cacheIsDirty: boolean;
  private headers: HttpHeaders;
  private _domain = environment.domain;
  private _routePrefix = 'api';
  private defaultApiVersion = 'v1';

  protected get data(): Observable<T[]> {
    if (this.isPristine || this.cacheIsDirty) {
      this.isPristine = false;
      return this.get();
    }
    return this.cache.asObservable();
  }

  constructor(
      protected httpClient: HttpClient,
      protected authService: AuthenticationService,
    ) {
    this.cache = new ReplaySubject<T[]>(1);
   }

  protected get(): Observable<T[]> {
    this._generateAuthHeaders();
    this.httpClient.get(this._generateUrl(this.apiUrl), {
      headers: this.headers
    })
    .map(this.handleData.bind(this))
    .share()
    .subscribe((data: T[]) => {
      this.cacheIsDirty = false;
      this.cache.next(data);
    });

    return this.cache.asObservable();
  }

  protected post(data: any): Observable<T[]> {
    this.cacheIsDirty = true;
    return this.httpClient.post(
      this._generateUrl(this.apiUrl),
      data,
      { headers: this.headers })
    .share()
    .flatMap(() => {
      return this.get().skipWhile(() => this.cacheIsDirty);
    });
  }

  protected abstract handleData(res: IServerResponse): T[];

  private _generateUrl(route: string, apiVersion: string = this.defaultApiVersion): string {
    return this._domain + '/' + this._routePrefix + '/' + apiVersion + '/' + route;
  }

  private _generateAuthHeaders() {
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}

