import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NavigationService } from '../navigation.service';

@Component({
  moduleId: module.id,
  selector: 'pet-bros-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = 'test@email.com';
  public password = 'seba1234';

  public displayName = 'Sebastian';
  public defaultSearchLocation = 'Boston, MA';

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit() { }

  login(isValid: boolean) {
    if (isValid) {
      this.userService.signIn(this.email, this.password).
      then(user => {
        this.navigationService.navigate(['/home'], { clearHistory: true });
      });
    }
  }

  register(isValid: boolean) {
    if (isValid) {
      this.userService.register(this.email, this.password, this.displayName, this.defaultSearchLocation).
      then(user => {
        this.navigationService.navigate(['/home'], { clearHistory: true });
      });
    }
  }
}
