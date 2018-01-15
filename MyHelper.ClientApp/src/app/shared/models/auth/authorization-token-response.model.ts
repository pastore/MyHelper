import { AppUserViewModel } from './app-user-viewmodel.model';

export class AuthorizationTokenResponse {
  public token: string;
  public expirationDate: string;
  public appUserViewModel: AppUserViewModel;
}

