import { UserRole } from './user-role';

export class CurrentUser {
  constructor(
    public id: number,
    public userName: string,
    public email: string,
    public userRole: UserRole,
    public avatar: string,
    public createdDate: string,
    public token: string
  ) {}
}
