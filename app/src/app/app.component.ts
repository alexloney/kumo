import { UserService } from './user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userService: UserService,
    private router: Router)
  {
    if (userService.loggedIn())
    {
      if (userService.isUser())
      {
        this.router.navigate(['/user']);
      }
      else if (userService.isDm())
      {
        this.router.navigate(['/dm']);
      }
      else if (userService.isAdmin())
      {
        this.router.navigate(['/admin']);
      }
      else
      {
        this.router.navigate(['/login']);
      }
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }
}
