import { Constants } from '../../utilities/constants';
import { SortDirection } from '../../utilities/enums';

export  class AdminTableFilterRequest {
  constructor(
    public search = '',
    public sortColumn = Constants.SortDefaultColumn,
    public sortDirection = SortDirection[SortDirection.Asc].toLowerCase(),
    public limit = Constants.AdminTableDefaultLimit,
    public offset = 0
  ) { }
}
