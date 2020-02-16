import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../utilities/api-route';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RequestMethod } from '../utilities/enums';
import { MhTaskFilterRequest } from '../models/tasks/mh-task-filter-request.model';
import { MhTaskResponse } from '../models/tasks/mh-task-response.model';
import { MhTaskRequest } from '../models/tasks/mh-task-request.model';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class TaskService extends BaseService {
  private headers: HttpHeaders;

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
    this._generateAuthHeaders();
  }

  getTasks(mhTaskFilterRequest?: MhTaskFilterRequest, isLoader = true): Observable<MhTaskResponse[]> {
    const searchParams = this.generateSearchParams(mhTaskFilterRequest);
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<MhTaskResponse[]>(RequestMethod.Get, ApiRoute.Tasks, null, this.headers, searchParams)
    .pipe(finalize(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    }));
  }

  addTask(mhTask: MhTaskRequest): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Tasks, mhTask, this.headers);
  }

  updateTask(mhTask: MhTaskRequest): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Tasks, mhTask, this.headers);
  }

  updateTaskStatus(id: number, status: number): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Patch, ApiRoute.Tasks + '/' + id, status, this.headers);
  }

  deleteTask(id: number): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Tasks + '/' + id, null, this.headers);
  }

  private _generateAuthHeaders() {
    const token = this._authService.currentUser ? this._authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}
