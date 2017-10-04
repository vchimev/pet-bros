import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule } from '@angular/http';
import { MdButtonModule, MdInputModule, MdSelectModule, MdFormFieldModule, MdTabsModule } from '@angular/material';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { AppComponent } from './app.component';
import { Config } from './common/index';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from './app.common';

import { UserService } from './user.service';
import { NavigationService } from 'app/navigation.service';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(<any>http, './assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    ...COMPONENT_DECLARATIONS
  ],
  imports: [
    BrowserAnimationsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    ...SHARED_MODULES,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdFormFieldModule,
    MdTabsModule
  ],
  providers: [
    UserService,
    NavigationService
  ]
})
export class AppModule {}
