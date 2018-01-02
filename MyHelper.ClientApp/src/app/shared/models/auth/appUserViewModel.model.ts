import { UserRole } from '../user/user-role';

export class AppUserViewModel {
  public id: number;
  public userName: string;
  public email: string;
  public avatar: string;
  public role: UserRole;
  public createdDate: string;
}
