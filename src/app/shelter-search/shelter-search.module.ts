import { NgModule } from '@angular/core';
import { MdInputModule, MdSelectModule, MdButtonModule, MdCardModule } from '@angular/material';

import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './shelter-search.common';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class ShelterSearchModule { }
