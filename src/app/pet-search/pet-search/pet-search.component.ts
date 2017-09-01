import { Component } from '@angular/core';
import { PetFinderService, Pet, PetSearchOptions, Options, AvailableValues } from 'petfinder-angular-service';
import { UserService } from '../../user.service';
import { NavigationService } from '../../navigation.service';

@Component({
  moduleId: module.id,
  selector: 'petbros-pet-search',
  templateUrl: './pet-search.component.html',
  styleUrls: ['./pet-search.component.scss']
})
export class PetSearchComponent {
  public location = 'Boston, MA';
  public searchOptions: PetSearchOptions = {
    animal: 'dog',
    breed: '',
    age: '',
    sex: ''
  };

  public breeds: string[] = [];

  public availableValues = AvailableValues;

  constructor(
    private navigation: NavigationService,
    private petfinderService: PetFinderService) { }

  refreshBreeds() {
    this.searchOptions.breed = null;
    if (this.searchOptions.animal) {
      this.petfinderService.breedList(this.searchOptions.animal)
      .then(breeds => this.breeds = breeds);
    } else {
      this.breeds = [];
    }
  }

  findPets() {
    const navigationExtras = {
      queryParams: {
        'location': this.location,
        'searchOptions': JSON.stringify(this.searchOptions)
      }
    };
    this.navigation.navigate(['petSearch/results'], navigationExtras);
  }

}
