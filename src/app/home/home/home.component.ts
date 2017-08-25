import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../user.service';
import { FirebaseUser } from '../../firebase';


@Component({
  moduleId: module.id,
  selector: 'pet-bros-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user$: Observable<FirebaseUser>;
  constructor(private userService: UserService) { }


  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  update() {
    this.userService.updateUserDetails({
      displayName: 'new-name' + Date.now()
    });
  }

  logout() {
    this.userService.logout();
  }
}
