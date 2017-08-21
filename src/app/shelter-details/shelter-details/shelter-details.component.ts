import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetFinderService, Shelter } from 'petfinder-angular-service';

@Component({
  moduleId: module.id,
  selector: 'pet-bros-shelter-details',
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.scss']
})
export class ShelterDetailsComponent implements OnInit {
  public shelter: Shelter;
  constructor(private route: ActivatedRoute, private petFinderService: PetFinderService) { }

  ngOnInit() {
    const shelterId = this.route.snapshot.params['shelterId'];

    this.petFinderService.getShelter(shelterId)
    .then(shelter => this.shelter = shelter);

    // this.petFinderService.findShelters('Boston, MA')
    // .then(shelters => this.shelter = shelters[0]);
  }

}
