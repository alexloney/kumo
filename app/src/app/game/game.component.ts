import { MessageService } from 'primeng/api';
import { UserService } from './../user.service';
import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {

  @Input() gameData: GameData;
  @Output() registerGame = new EventEmitter<number>();
  @Output() unRegisterGame = new EventEmitter<number>();

  public showDialog: boolean = false;
  public userLookup: any = [];

  constructor(public userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.populateUserLookup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateUserLookup();
  }

  private populateUserLookup(): void
  {
    const userIdList: number[] = [];
    for (const user of this.gameData.registered)
    {
      userIdList.push(user);
    }
    for (const user of this.gameData.waitlisted)
    {
      userIdList.push(user);
    }

    this.userService.getUserNames(userIdList).then(
      (success) => {
        this.userLookup = success;
      },
      (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'User Lookup Error',
          detail: failure});
      }
    );
  }

}
