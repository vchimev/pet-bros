import { NgModule } from '@angular/core';
import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';

import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './pet.common';
@NgModule({
  imports: [
    ...SHARED_MODULES,
    MdCardModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [
    ...COMPONENT_DECLARATIONS,
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class PetModule { }
