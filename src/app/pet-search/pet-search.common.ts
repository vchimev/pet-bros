// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { PetSearchRoutes } from './pet-search.routes';
import { PetSearchComponent } from './pet-search/pet-search.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  RouterModule.forChild(<any>PetSearchRoutes),
  TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
  PetSearchComponent
];
