import { Component } from '@angular/core';
// vendor dependencies
import { TranslateService } from '@ngx-translate/core';
// app
import { MenuItem } from './menu/menu.common';

@Component({
  moduleId: module.id,
  selector: 'petbros-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  menuItems: MenuItem[] = [
    {
      title: 'menu.login',
      link: ['/login']
    },
    {
      title: 'menu.home',
      link: ['/home']
    },
    {
      title: 'menu.pet-search',
      link: ['/petSearch']
    },
    {
      title: 'menu.shelter-search',
      link: ['/shelterSearch']
    }
  ];

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
