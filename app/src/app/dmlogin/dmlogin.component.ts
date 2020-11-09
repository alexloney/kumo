import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmlogin',
  templateUrl: './dmlogin.component.html',
  styleUrls: ['./dmlogin.component.scss']
})
export class DMLoginComponent implements OnInit {

  public dmId: string;
  public password: string;

  constructor() { }

  ngOnInit(): void {
  }

  public handleLogin(e)
  {
    // TODO: Implement DM login
  }

}
