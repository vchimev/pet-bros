// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { ShelterDetailsRoutes } from './shelter-details.routes';
import { ShelterDetailsComponent } from './shelter-details/shelter-details.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>ShelterDetailsRoutes),
  TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
  ShelterDetailsComponent
];
