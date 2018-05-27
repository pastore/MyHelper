import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ICard } from '../../shared/models/base/i-card.model';
import { MhTaskResponse } from '../../shared/models/tasks/mh-task-response.model';
import { MhTaskFilterRequest } from '../../shared/models/tasks/mh-task-filter-request.model';
import { FilterItem } from '../../shared/models/base/filter-item.model';
import { FilterType, CardType, MhTaskStatus } from '../../shared/utilities/enums';
import { TaskService } from '../../shared/services/task.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { CardsPageComponent } from '../shared/components/cards-page/cards-page.component';
import { ILoaderState } from '../../shared/loader/i-loader-state.model';

@Component({
  selector: 'mh-tasks-page',
  templateUrl: './tasks-page.component.html'
})
export class TasksPageComponent
 extends CardsPageComponent<MhTaskResponse, MhTaskFilterRequest>
 implements OnInit {

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
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
  }

  updateTaskStatus(params) {
    this._taskService.updateTaskStatus(params.id, (params.status ? MhTaskStatus.Done : MhTaskStatus.None))
    .subscribe(response => {});
  }

  protected getCards() {
    this._taskService.getTasks(this.cardsFilterModel)
    .subscribe((responseCards: MhTaskResponse[]) => {
      this.cards = responseCards.map((x) => {
        return { data : x, cardType : CardType.Task } as ICard<MhTaskResponse>;
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
