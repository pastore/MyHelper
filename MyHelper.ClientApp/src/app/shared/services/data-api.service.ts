import {
  HttpClient,
  HttpResponse,
  HttpHeaders
 } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouteApiVersionService } from './route-api-version.service';
import '../utilities/rxjs-operators';
import { AuthenticationService } from './authentication.service';
import { IServerResponse } from '../models/base/server-response.model';

export abstract class DataAPIService<T> extends RouteApiVersionService {
  protected abstract get apiUrl(): string;
  private cache: ReplaySubject<T[]>;
  protected isPristine = true;
  private cacheIsDirty: boolean;
  private headers: HttpHeaders;

  protected get data(): Observable<T[]> {
    if (this.isPristine || this.cacheIsDirty) {
      this.isPristine = false;
      return this.get();
    }
    return this.cache.asObservable();
  }

  constructor(protected httpClient: HttpClient,
    protected authService: AuthenticationService) {
    super();
    this.cache = new ReplaySubject<T[]>(1);
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
   }

  protected get(): Observable<T[]> {
    this.httpClient.get(this.generateUrl(this.apiUrl), {
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
      this.generateUrl(this.apiUrl),
      data,
      { headers: this.headers })
    .share()
    .flatMap(() => {
      return this.get().skipWhile(() => this.cacheIsDirty);
    });
  }

  protected abstract handleData(res: IServerResponse): T[];
}

