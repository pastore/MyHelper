import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';
import { BaseService } from './base.service';
import { ApiRoute } from '../app-settings/api-route';
import { NoteResponse } from '../models/system/note-response.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoteService extends BaseService {

  constructor(private http: Http) {
    super(http);
  }

  getNotes(): Observable<NoteResponse[]> {
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes);
  }
}
