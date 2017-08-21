// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { ShelterSearchRoutes } from './shelter-search.routes';
import { ShelterSearchComponent } from './shelter-search/shelter-search.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>ShelterSearchRoutes),
  TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
  ShelterSearchComponent
];
