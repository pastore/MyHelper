import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../utilities/api-route';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '../utilities/enums';
import { MhTaskFilterRequest } from '../models/tasks/mh-task-filter-request.model';
import { MhTaskResponse } from '../models/tasks/mh-task-response.model';
import { MhTaskRequest } from '../models/tasks/mh-task-request.model';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class TaskService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
  }

  getTasks(mhTaskFilterRequest?: MhTaskFilterRequest, isLoader = true): Observable<MhTaskResponse[]> {
    const searchParams = this.generateSearchParams(mhTaskFilterRequest);
    const headers = this._generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<MhTaskResponse[]>(RequestMethod.Get, ApiRoute.Tasks, null, headers, searchParams)
    .finally(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    });
  }

  addTask(mhTask: MhTaskRequest): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Tasks, mhTask, headers);
  }

  updateTask(mhTask: MhTaskRequest): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Tasks, mhTask, headers);
  }

  updateTaskStatus(id: number, status: number): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Patch, ApiRoute.Tasks + '/' + id, status, headers);
  }

  deleteTask(id: number): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Tasks + '/' + id, null, headers);
  }

  private _generateAuthHeaders(): HttpHeaders {
    const token = this._authService.currentUser ? this._authService.token : '';
    return new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}
