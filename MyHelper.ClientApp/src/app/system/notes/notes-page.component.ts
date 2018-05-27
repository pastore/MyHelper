import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { CardType, FilterType } from '../../shared/utilities/enums';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { NoteFilterRequest } from '../../shared/models/notes/note-filter-request.model';
import { CardsPageComponent } from '../shared/components/cards-page/cards-page.component';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';

@Component({
  selector: 'mh-notes-page',
  templateUrl: './notes-page.component.html'
})
export class NotesPageComponent
  extends CardsPageComponent<NoteResponse, NoteFilterRequest>
  implements OnInit {

  constructor(
    private noteService: NoteService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
    this.searchPlaceholder = 'Search notes';
  }

  ngOnInit() {
    super.ngOnInit();
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id)
      .subscribe((result: boolean) => {
        if (result) {
          this.getCards();
        }
      });
  }

  protected getCards() {
    this.noteService.getNotes(this.cardsFilterModel)
    .subscribe((noteResponseList: NoteResponse[]) => {
      this.cards = noteResponseList.map((x) => {
        return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
      });
      this.setTooltip();
    });
  }

  protected setFilterItems() {
    this.filterItems = [new FilterItem(FilterType.TagsFilter, 'Tags')];
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
