import { UserRole } from '../../utilities/enums';

export class AppUserViewModel {
  public id: number;
  public userame: string;
  public email: string;
  public avatar: string;
  public role: UserRole;
  public createdDate: string;
}
