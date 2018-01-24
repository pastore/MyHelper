import { AppUserViewModel } from '../user/app-user-view.model';

export class AuthorizationTokenResponse {
  public token: string;
  public expirationDate: string;
  public appUserViewModel: AppUserViewModel;
}

