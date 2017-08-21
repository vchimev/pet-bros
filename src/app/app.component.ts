import { Component } from '@angular/core';
// vendor dependencies
import { TranslateService } from '@ngx-translate/core';
// app
import { MenuItem } from './menu/menu.common';

@Component({
    moduleId: module.id,
    selector: 'pet-bros-app',
    templateUrl: './app.component.html',
})
export class AppComponent {

    menuItems: MenuItem[] = [
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
        },
        {
            title: 'pet details [pet/38990695]',
            link: ['/pet', '38990695']
        },
        {
            title: 'shelter details [shelter/MA195]',
            link: ['/shelter', 'MA195']
        }
    ];

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
