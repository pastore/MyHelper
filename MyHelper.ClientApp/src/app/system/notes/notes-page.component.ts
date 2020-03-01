import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';
import { LoaderService } from '../../shared/loader/loader.service';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { ICard } from '../../shared/models/base/i-card.model';
import { NoteFilterRequest } from '../../shared/models/notes/note-filter-request.model';
import { NoteResponse } from '../../shared/models/notes/note-response.model';
import { NoteService } from '../../shared/services/note.service';
import { CardType, FilterType } from '../../shared/utilities/enums';
import { BaseEditCardsComponent } from '../shared/components/base/base-edit-cards.component';

@Component({
  selector: 'mh-notes-page',
  templateUrl: './notes-page.component.html'
})
export class NotesPageComponent
  extends BaseEditCardsComponent<ICard<NoteResponse>, NoteFilterRequest>
  implements OnInit, OnDestroy {
  subscription = new Subscription();

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteNote(id: number) {
    this._noteService.deleteNote(id)
      .subscribe((result: boolean) => {
        if (result) {
          this.getCards();
        }
      });
  }

  getCards() {
    this.subscription = this._noteService.getNotes(this.cardsFilterModel)
      .subscribe((notes: NoteResponse[]) => {
        this.cards = notes.map((x) => {
          return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
        });
      });
  }

  setFilterItems() {
    this.filterItems = [new FilterItem(FilterType.TagsFilter, 'Tags')];
  }

  handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    if ((this.cards.length % this.cardsFilterModel.limit) === 0 && this.isScroll) {
      this._noteService.getNotes(this.cardsFilterModel, false)
        .subscribe((notes: NoteResponse[]) => {
          if (notes.length > 0) {
            this.cards = this.cards.concat(notes.map((x) => {
              return { data : x, cardType : CardType.Note } as ICard<NoteResponse>;
            }));
          } else {
            this.isScroll = false;
          }
        });
    }
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
