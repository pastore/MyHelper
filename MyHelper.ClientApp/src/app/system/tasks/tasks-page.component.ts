import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ICard } from '../../shared/models/base/i-card.model';
import { MhTaskResponse } from '../../shared/models/tasks/mh-task-response.model';
import { MhTaskFilterRequest } from '../../shared/models/tasks/mh-task-filter-request.model';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { FilterType, CardType, MhTaskStatus } from '../../shared/utilities/enums';
import { TaskService } from '../../shared/services/task.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { BaseEditCardsComponent } from '../shared/components/base/base-edit-cards.component';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';

@Component({
  selector: 'mh-tasks-page',
  templateUrl: './tasks-page.component.html'
})
export class TasksPageComponent
 extends BaseEditCardsComponent<ICard<MhTaskResponse>, MhTaskFilterRequest>
 implements OnInit {
  today = new Date().toISOString();

  constructor(
    private _taskService: TaskService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
    this.searchPlaceholder = 'Search tasks';
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFilterFromTodayDate();
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
  }

  updateTaskStatus(params) {
    this._taskService.updateTaskStatus(params.id, (params.status ? MhTaskStatus.Done : MhTaskStatus.None))
      .subscribe(response => {});
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id)
      .subscribe((result: boolean) => {
        if (result) {
          this.getCards();
        }
      });
  }

  getCards() {
    this._taskService.getTasks(this.cardsFilterModel)
      .subscribe((responseCards: MhTaskResponse[]) => {
        this.cards = responseCards.map((x) => {
          return { data : x, cardType : CardType.Task } as ICard<MhTaskResponse>;
        });
      });
  }

  setFilterItems() {
    const fromDate = new FilterItem(FilterType.DateTimeFilter, 'From');
    fromDate.value = this.today;

    this.filterItems = [
      new FilterItem(FilterType.TagsFilter, 'Tags'),
      fromDate,
      new FilterItem(FilterType.DateTimeFilter, 'To')
    ];
  }

  handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    if ((this.cards.length % this.cardsFilterModel.limit) === 0 && this.isScroll) {
      this._taskService.getTasks(this.cardsFilterModel, false)
        .subscribe((tasks: MhTaskResponse[]) => {
          if (tasks.length > 0) {
            this.cards = this.cards.concat(tasks.map((x) => {
              return { data : x, cardType : CardType.Note } as ICard<MhTaskResponse>;
            }));
          } else {
            this.isScroll = false;
          }
        });
    }
  }

  setFilterFromTodayDate() {
    this.cardsFilterModel.fromDate = this.today as any;
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
