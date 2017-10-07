// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [
  LoginComponent
];
