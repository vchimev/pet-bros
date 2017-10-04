import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdButtonModule } from '@angular/material';
// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS, COMPONENT_EXPORTS } from './menu.common';

@NgModule({
    imports: [
        ...SHARED_MODULES,
        RouterModule,
        MdToolbarModule,
        MdButtonModule
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    exports: [
        ...COMPONENT_EXPORTS
    ]
})
export class MenuModule { }
