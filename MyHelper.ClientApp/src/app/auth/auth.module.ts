import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../shared/modules/core.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CoreModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
})
export class AuthModule { }

