import { RouterModule } from './common';

import { AppRoutes } from './app.routes';

import { MenuModule } from './menu/menu.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule,
  RouterModule.forRoot(AppRoutes), // { useHash: true }
  MenuModule
];

export const COMPONENT_DECLARATIONS: any[] = [
  LoginComponent
];
