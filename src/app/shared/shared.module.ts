import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '../common';
import { FirebaseModule } from '../firebase';

import { PetFinderService, API_KEY_TOKEN } from 'petfinder-angular-service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FirebaseModule
  ],
  providers: [
    { provide: API_KEY_TOKEN, useValue: '3b3fe2619dfd3c4e94c2d7efd24592e1' },
    PetFinderService
  ]
})
export class SharedModule { };
