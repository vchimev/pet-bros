import { Routes } from '@angular/router';

import { AuthGuard } from './auth-guards.service';
import { loginRoutes } from './login';

export const guards = [
  AuthGuard,
];

const authGuards = {
  canLoad: [AuthGuard],
  canActivateChild: [AuthGuard],
};

/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'login',
    children: loginRoutes,
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    ...authGuards
  },
  {
    path: 'petSearch',
    loadChildren: 'app/pet-search/pet-search.module#PetSearchModule',
    ...authGuards
  },
  {
    path: 'shelterSearch',
    loadChildren: 'app/shelter-search/shelter-search.module#ShelterSearchModule',
    ...authGuards
  },
  {
    path: 'pet/:petId',
    loadChildren: 'app/pet-details/pet-details.module#PetDetailsModule',
    ...authGuards
  },
  {
    path: 'shelter/:shelterId',
    loadChildren: 'app/shelter-details/shelter-details.module#ShelterDetailsModule',
    ...authGuards
  }
];
