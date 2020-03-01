import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { NoteFilterRequest } from '../models/notes/note-filter-request.model';
import { NoteRequest } from '../models/notes/note-request.model';
import { NoteResponse } from '../models/notes/note-response.model';
import { ApiRoute } from '../utilities/api-route';
import { RequestMethod } from '../utilities/enums';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class NoteService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient, authService);
  }

  getNotes(noteFilterRequest?: NoteFilterRequest, isLoader = true): Observable<NoteResponse[]> {
    const searchParams = this.generateSearchParams(noteFilterRequest);
    const headers = this.generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes, null, headers, searchParams)
      .pipe(finalize(() => {
        if (isLoader) {
          this._loaderService.hide();
        }
      }));
  }

  addNote(note: NoteRequest): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Notes, note, headers);
  }

  updateNote(note: NoteRequest): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Notes, note, headers);
  }

  deleteNote(id: number): Observable<boolean> {
    const headers = this.generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Notes + '/' + id, null, headers);
  }
}
