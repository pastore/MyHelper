import { UserRole } from '../../utilities/enums';

export class AppUserViewModel {
  public id: number;
  public username: string;
  public email: string;
  public avatar: string;
  public role: UserRole;
  public createdDate: string;
}
