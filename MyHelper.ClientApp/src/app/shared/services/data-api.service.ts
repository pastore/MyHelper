import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouteApiVersionService } from './route-api-version.service';
import '../utilities/rxjs-operators';
import { AuthenticationService } from './authentication.service';

export abstract class DataAPIService<T> extends RouteApiVersionService {
  protected abstract get apiUrl(): string;
  private cache: ReplaySubject<T[]>;
  protected isPristine = true;
  private cacheIsDirty: boolean;
  private headers: Headers;

  protected get data(): Observable<T[]> {
    if (this.isPristine || this.cacheIsDirty) {
      this.isPristine = false;
      return this.get();
    }
    return this.cache.asObservable();
  }

  constructor(protected http: Http,
    protected authService: AuthenticationService) {
    super();
    this.cache = new ReplaySubject<T[]>(1);
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + token);
   }

  protected get(): Observable<T[]> {
    this.http.get(this.generateUrl(this.apiUrl), {
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
    return this.http.post(
      this.generateUrl(this.apiUrl),
      data,
      { headers: this.headers })
    .share()
    .flatMap(() => {
        return this.get().skipWhile(() => this.cacheIsDirty);
    });
  }

  protected abstract handleData(res: Response): T[];
}

