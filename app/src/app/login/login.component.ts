import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SpinnerService } from '../spinner.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public kumoId: string;
  public name: string;

  public loginKumoIdInvalid: boolean = false;
  public loginKumoIdInvalidError: string = '';

  constructor(private userService: UserService,
    private spinnerService: SpinnerService,
    private router: Router,
    private messageService: MessageService)
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
    }
  }

  ngOnInit(): void {

  }

  public handleLogin(e): void
  {
    this.spinnerService.showSpinner();
    this.userService.login(this.kumoId).then(
      (success) => {
        if (this.userService.loggedIn())
        {
          if (this.userService.isUser())
          {
            this.router.navigate(['/user']);
          }
          else if (this.userService.isDm())
          {
            this.router.navigate(['/dm']);
          }
          else if (this.userService.isAdmin())
          {
            this.router.navigate(['/admin']);
          }
          else
          {
            this.messageService.add({severity: 'error', summary: 'Login Failure', detail: 'Successfully logged in, but unable to determine user type.'});
          }
        }
        else
        {
          this.messageService.add({severity: 'error', summary: 'Login Failure', detail: 'Successfully logged in, but login status unchanged.'});
        }
      },
      (failure) => {
        this.messageService.add({severity: 'error', summary: 'Login Failure', detail: failure});
      }
    ).finally(() => {
      this.spinnerService.hideSpinner();
    });
  }

  public handleRegister(e): void
  {
    this.spinnerService.showSpinner();
    this.userService.register(this.kumoId, this.name).then(
      (success) => {
        if (this.userService.loggedIn())
        {
          if (this.userService.isUser())
          {
            this.router.navigate(['/user']);
          }
          else if (this.userService.isDm())
          {
            this.router.navigate(['/dm']);
          }
          else if (this.userService.isAdmin())
          {
            this.router.navigate(['/admin']);
          }
          else
          {
            this.messageService.add({severity: 'error', summary: 'Login Failure', detail: 'Successfully registered, but unable to determine user type.'});
          }
        }
        else
        {
          this.messageService.add({severity: 'error', summary: 'Login Failure', detail: 'Successfully registered, but login status unchanged.'});
        }
      },
      (failure) => {
        this.messageService.add({severity: 'error', summary: 'Register Failure', detail: failure});
      }
    ).finally(() => {
      this.spinnerService.hideSpinner();
    });
  }
}
