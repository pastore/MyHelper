import { UserRole } from '../../utilities/enums';

export class AppUserViewModel {
  public id: number;
  public userName: string;
  public email: string;
  public avatar: string;
  public userRole: UserRole;
  public createdDate: string;
}
