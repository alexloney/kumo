import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public adminId: string;
  public password: string;

  constructor() { }

  ngOnInit(): void {
  }

  public handleLogin(e)
  {
    // TODO: Handle admin login
  }

}
