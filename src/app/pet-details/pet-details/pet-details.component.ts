import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetFinderService, Pet } from 'petfinder-angular-service';

@Component({
  moduleId: module.id,
  selector: 'pet-bros-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  public pet: Pet;

  constructor(private route: ActivatedRoute, private petFinderService: PetFinderService) { }

  ngOnInit() {
    const petId = this.route.snapshot.params['petId'];

    // this.petFinderService.getRandomPet()
    this.petFinderService.getPet(petId)
    .then(pet => this.pet = pet);
  }

}
