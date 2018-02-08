import { FilterType } from '../../utilities/enums';

export class FilterItem {
  constructor(
    public type: FilterType,
    public placeHolder: string
  ) {}
}
