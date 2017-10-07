import { RouterModule } from './common';

import { AppRoutes, guards } from './app.routes';

import { MenuModule } from './menu/menu.module';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { LoginModule } from './login';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule,
  RouterModule.forRoot(AppRoutes), // { useHash: true }
  MenuModule,
  LoginModule
];

export const COMPONENT_DECLARATIONS: any[] = [
  AppComponent
];

export const PROVIDERS: any[] = [
  ...guards
];
