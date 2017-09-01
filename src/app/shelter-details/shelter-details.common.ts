// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { ShelterDetailsRoutes } from './shelter-details.routes';
import { ShelterDetailsComponent } from './shelter-details/shelter-details.component';
import { ShelterPetsComponent } from './shelter-pets/shelter-pets.component';
import { PetModule } from '../pet';

export const SHARED_MODULES: any[] = [
  SharedModule,
  PetModule,
  RouterModule.forChild(<any>ShelterDetailsRoutes),
  TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [
  ShelterDetailsComponent,
  ShelterPetsComponent
];
