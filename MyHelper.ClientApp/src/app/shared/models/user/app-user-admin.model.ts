import { AppUserViewModel } from './app-user-view.model';

export class AppUserAdminModel extends AppUserViewModel {
  notes: { id: number; name: string; }[]= [];
  tasks: { id: number; name: string; }[] = [];
}
