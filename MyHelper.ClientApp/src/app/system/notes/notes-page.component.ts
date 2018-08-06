import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { ICard } from '../../shared/models/base/i-card.model';
import { CardType, FilterType } from '../../shared/utilities/enums';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { NoteFilterRequest } from '../../shared/models/notes/note-filter-request.model';
import { BaseEditCardsComponent } from '../shared/components/base/base-edit-cards.component';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';

@Component({
  selector: 'mh-notes-page',
  templateUrl: './notes-page.component.html'
})
export class NotesPageComponent
  extends BaseEditCardsComponent<ICard<NoteResponse>, NoteFilterRequest>
  implements OnInit {

  constructor(
    private _noteService: NoteService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchPlaceholder = 'Search notes';
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
    this.cardsFilterModel.limit = 20;
  }

  deleteNote(id: number) {
    this._noteService.deleteNote(id)
      .subscribe((result: boolean) => {
        if (result) {
          this.getCards();
        }
      });
  }

  protected getCards() {
    this._noteService.getNotes(this.cardsFilterModel)
    .subscribe((notes: NoteResponse[]) => {
      this.cards = notes.map((x) => {
        return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
      });
    });
  }

  protected setFilterItems() {
    this.filterItems = [new FilterItem(FilterType.TagsFilter, 'Tags')];
  }

  protected handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    this._noteService.getNotes(this.cardsFilterModel, false)
    .subscribe((notes: NoteResponse[]) => {
      if (notes.length > 0 && (this.cards.length % this.cardsFilterModel.limit) === 0) {
        this.cards = this.cards.concat(notes.map((x) => {
          return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
        }));
      }
    });
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
