import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { ILoaderState } from './i-loader-state.model';

@Component({
    selector: 'mh-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    isShow = false;

    private subscription: Subscription;

    constructor(
        private _loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.subscription = this._loaderService.loaderState
          .subscribe((state: ILoaderState) => {
            this.isShow = state.isShow;
          });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
