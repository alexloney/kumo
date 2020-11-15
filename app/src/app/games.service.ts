import { DatabaseService } from './database.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private db: DatabaseService,
              private userService: UserService) { }

  public registerGame(id: number): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.registerUserForGame(this.userService.getMyId(), id);
  }

  public dropGame(id: number): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.dropUserFromGame(this.userService.getMyId(), id);
  }

  public getAllGames(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllGames();
  }

  public getTypeList(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllGameTypes();
  }

  public getDMs(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllDms();
  }

  public getSystems(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllGameSystems();
  }

  public getDays(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllGameDays();
  }

  public getTimes(): any {
    // TODO: Maybe add logic to parse database response?
    return this.db.getAllGameTimes();
  }
}
