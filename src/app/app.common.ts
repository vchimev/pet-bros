import { RouterModule } from './common';

import { AppRoutes } from './app.routes';

import { MenuModule } from './menu/menu.module';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule,
  RouterModule.forRoot(AppRoutes), // { useHash: true }
  MenuModule
];

export const COMPONENT_DECLARATIONS: any[] = [
  AppComponent,
  LoginComponent
];
