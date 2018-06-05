import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../utilities/api-route';
import { NoteResponse } from '../models/notes/note-response.model';
import { Observable } from 'rxjs/Observable';
import { NoteRequest } from '../models/notes/note-request.model';
import { NoteFilterRequest } from '../models/notes/note-filter-request.model';
import { RequestMethod } from '../utilities/enums';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class NoteService extends BaseService {

  private headers: HttpHeaders;

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
    const token = this._authService.currentUser ? this._authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }

  getNotes(noteFilterRequest?: NoteFilterRequest, isLoader = true): Observable<NoteResponse[]> {
    const searchParams = this.generateSearchParams(noteFilterRequest);
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes, null, this.headers, searchParams)
    .finally(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    });
  }

  addNote(note: NoteRequest): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Notes, note, this.headers);
  }

  updateNote(note: NoteRequest): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Notes, note, this.headers);
  }

  deleteNote(id: number): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Notes + '/' + id, null, this.headers);
  }
}
