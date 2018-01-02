import { AppUserViewModel } from './appUserViewModel.model';

export class AuthorizationTokenResponse {
  public token: string;
  public expirationDate: string;
  public appUserViewModel: AppUserViewModel;
}

