import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ILoaderState } from './i-loader-state.model';

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<ILoaderState>();

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<ILoaderState>{isShow: true});
    }

    hide() {
        this.loaderSubject.next(<ILoaderState>{isShow: false});
    }
}
