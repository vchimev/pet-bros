// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { PetComponent } from './pet/pet.component';

export const SHARED_MODULES: any[] = [
  SharedModule,
  TranslateModule.forChild()
];

export const COMPONENT_DECLARATIONS: any[] = [
  PetComponent
];
