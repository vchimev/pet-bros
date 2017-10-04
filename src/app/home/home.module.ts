import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MdTabsModule, MdCardModule, MdIconModule, MdButtonModule } from '@angular/material';

import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './home.common';

@NgModule({
  imports: [
    ...SHARED_MODULES,
    MdTabsModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
})
export class HomeModule {
  // constructor( @Optional() @SkipSelf() parentModule: HomeModule) {
  //   if (parentModule) {
  //       throw new Error('HomeModule already loaded; Import in root module only.');
  //   }
  // }
}
