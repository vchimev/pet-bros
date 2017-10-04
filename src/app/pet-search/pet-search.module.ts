import { NgModule } from '@angular/core';
import { MdInputModule, MdSelectModule, MdButtonModule } from '@angular/material';

import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './pet-search.common';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    MdInputModule,
    MdSelectModule,
    MdButtonModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class PetSearchModule { }
