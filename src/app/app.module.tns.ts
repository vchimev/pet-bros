import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { Http } from '@angular/http';
// nativescript
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './app.common';

import { UserService } from './user.service';
import { NavigationService } from './navigation.service';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    ...SHARED_MODULES
  ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  providers: [
    // Allows your {N} application to use lazy-loading
    { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
    UserService,
    NavigationService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
