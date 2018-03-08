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
import { NoteFilterRequest } from '../models/notes/note-filter-request';
import { RequestMethod } from '../utilities/enums';

@Injectable()
export class NoteService extends BaseService {

  private headers: HttpHeaders;

  constructor(protected httpClient: HttpClient, private authService: AuthenticationService) {
    super(httpClient);
    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
  }

   getNotes(noteFilterRequest?: NoteFilterRequest): Observable<NoteResponse[]> {
    const searchParams = this.generateSearchParams(noteFilterRequest);
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes, null, this.headers, searchParams);
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
