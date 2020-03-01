import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { MhTaskFilterRequest } from '../models/tasks/mh-task-filter-request.model';
import { MhTaskRequest } from '../models/tasks/mh-task-request.model';
import { MhTaskResponse } from '../models/tasks/mh-task-response.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class TaskService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient, authService);
  }

  getTasks(mhTaskFilterRequest?: MhTaskFilterRequest, isLoader = true): Observable<MhTaskResponse[]> {
    const searchParams = this.generateSearchParams(mhTaskFilterRequest);
    const headers = this.generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<MhTaskResponse[]>(RequestMethod.Get, ApiRoute.Tasks, null, headers, searchParams)
    .pipe(finalize(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    }));
  }

  addTask(mhTask: MhTaskRequest): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Tasks, mhTask, headers);
  }

  updateTask(mhTask: MhTaskRequest): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Tasks, mhTask, headers);
  }

  updateTaskStatus(id: number, status: number): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Patch, ApiRoute.Tasks + '/' + id, status, headers);
  }

  deleteTask(id: number): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Tasks + '/' + id, null, headers);
  }
}
