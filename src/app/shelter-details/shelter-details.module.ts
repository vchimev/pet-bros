import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';

import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './shelter-details.common';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    MdButtonModule,
    MdCardModule,
    MdIconModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class ShelterDetailsModule { }
