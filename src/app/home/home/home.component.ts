import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { FirebaseUser, FirebaseDataService } from '../../firebase';
// import { FirebaseDataService } from '../../firebase/firebase-data.service';
import { User, PetBasic } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'petbros-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private userService: UserService, private dataService: FirebaseDataService) { }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }
}

