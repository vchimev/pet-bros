import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetFinderService, Pet } from 'petfinder-angular-service';
import { UserService } from '../../user.service';

@Component({
  moduleId: module.id,
  selector: 'petbros-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  public pet: Pet;
  public favourite = false;

  constructor(
    private route: ActivatedRoute,
    private petFinderService: PetFinderService,
    private userService: UserService) { }

  ngOnInit() {
    const petId = this.route.snapshot.params['petId'];

    this.petFinderService.getPet(petId)
    .then(pet => this.pet = pet);
  }

  addToFavourites() {
    this.favourite = true;
    this.userService.addPetToFavourites(this.pet);
  }

  removeFromFavourites() {
    this.favourite = false;
    this.userService.removePetFromFavourites(this.pet.id);
  }

}
