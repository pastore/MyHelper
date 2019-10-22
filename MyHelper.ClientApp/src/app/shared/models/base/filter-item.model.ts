import { FilterType } from '../../utilities/enums';

export class FilterItem {
  value: any;

  constructor(
    public type: FilterType,
    public placeholder: string
  ) {}
}
