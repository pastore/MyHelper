import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RouteApiVersionService } from './route-api-version.service';
import '../utilities/rxjs-operators';

export abstract class DataAPIService<T> extends RouteApiVersionService {
  protected abstract get apiUrl(): string;
  private cache: ReplaySubject<T[]>;
  private cacheIsDirty: boolean;

  get data(): Observable<T[]> {
    if (this.cacheIsDirty) {
      return this.get();
    }
    return this.cache.asObservable();
  }

  constructor(protected http: Http) {
    super();
    this.cache = new ReplaySubject<T[]>(1);
   }

  get(): Observable<T[]> {
    this.http.get(this.generateUrl(this.apiUrl))
    .map(this.handleData.bind(this))
    .share()
    .subscribe((data: T[]) => {
      this.cacheIsDirty = false;
      this.cache.next(data);
    });

    return this.cache.asObservable();
  }

  post(data: any): Observable<T[]> {
    this.cacheIsDirty = true;
    return this.http.post(this.generateUrl(this.apiUrl), data)
    .share()
    .flatMap(() => {
        return this.get().skipWhile(() => this.cacheIsDirty);
    });
  }

  protected abstract handleData(res: Response): T[];
}

