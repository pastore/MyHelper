import { Injectable } from '@angular/core';
import { Http, RequestMethod, Headers } from '@angular/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../app-settings/api-route';
import { NoteResponse } from '../models/notes/note-response.model';
import { Observable } from 'rxjs/Observable';
import { NoteRequest } from '../models/notes/note-request.model';

@Injectable()
export class NoteService extends BaseService {

  private headers: Headers;

  constructor(private http: Http, private authService: AuthenticationService) {
    super(http);

    const token = this.authService.currentUser ? this.authService.token : '';
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + token);
  }

  getNotes(): Observable<NoteResponse[]> {
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes, null, this.headers);
  }

  addNote(note: NoteRequest): Observable<boolean> {
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Notes, note, this.headers);
  }
}
