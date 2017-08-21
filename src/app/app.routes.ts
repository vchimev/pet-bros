import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'petSearch',
    loadChildren: 'app/pet-search/pet-search.module#PetSearchModule'
  },
  {
    path: 'shelterSearch',
    loadChildren: 'app/shelter-search/shelter-search.module#ShelterSearchModule'
  },
  {
    path: 'pet/:petId',
    loadChildren: 'app/pet-details/pet-details.module#PetDetailsModule'
  },
  {
    path: 'shelter/:shelterId',
    loadChildren: 'app/shelter-details/shelter-details.module#ShelterDetailsModule'
  }
];
