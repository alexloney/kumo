import { MessageService } from 'primeng/api';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public PT_ALLGAMES = 0;
  public PT_MYGAMES = 1;
  public pageType: number = this.PT_MYGAMES;

  private FT_ANY = 0;
  private FT_ALL = 1;
  private FT_MY = 2;

  private FT_ANYDM = 0;
  private FT_ANYSYSTEM = 0;

  private m_filterType: number = this.FT_MY;
  get filterType(): number
  {
    return this.m_filterType;
  }
  set filterType(val: number)
  {
    this.m_filterType = val;
    if (this.m_filterType === this.FT_ANY || this.m_filterType === this.FT_ALL)
    {
      this.pageType = this.PT_ALLGAMES;
    }
    else if (this.m_filterType === this.FT_MY)
    {
      this.pageType = this.PT_MYGAMES;
    }
    else
    {
      this.messageService.add({
        severity: 'error',
        summary: 'Filter Type Failure',
        detail: 'Unknown filter type selected (' + val + ')'});
    }
  }

  public filterStr: string = '';
  public filterDm: number = this.FT_ANYDM;
  public filterSystem: number = this.FT_ANYSYSTEM;
  public filterOpenGames: boolean = false;

  constructor(
    public userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    if (!userService.loggedIn() || !userService.isUser())
    {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  public viewAllGames(): void
  {
    this.pageType = this.PT_ALLGAMES;
    this.filterType = this.FT_ALL;
  }

  public viewMyGames(): void
  {
    this.pageType = this.PT_MYGAMES;
    this.filterType = this.FT_MY;
  }

  public logout(): void
  {
    this.userService.logout().then(
      (success) => {
        this.router.navigate(['/home']);
      },
      (failure) => {
        this.messageService.add({severity: 'error', summary: 'Logout Failure', detail: failure});
      }
    )
  }

}
