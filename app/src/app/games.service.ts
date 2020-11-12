import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private allGames = [
    {
      id: 1,
      title: 'Tales Trees Tell',
      system: 'D&D 5e',
      systemid: 1,
      dm: 'Peter H.',
      dmid: 1,
      day: 'Friday',
      dayid: 1,
      time: '2:00 pm',
      timeid: 1,
      registermax: 7,
      registered: [
        2,
        3,
        4
      ],
      waitlistmax: 4,
      waitlisted: [],
      description: 'Tales Trees Tell is an adventure module set in the Forgotten Realms using the Dungeons & Dragons 5th edition ruleset. It is part of the Tyranny of Dragons series of adventures published for the D&D Adventurers League. It focuses on Phalan and is an adventure designed for three to seven 1st- to 4th-level characters.'
    },
    {
      id: 2,
      title: 'Tales Trees Tell',
      system: 'D&D 5e',
      systemid: 1,
      dm: 'Peter H.',
      dmid: 1,
      day: 'Friday',
      dayid: 1,
      time: '2:00 pm',
      timeid: 1,
      registermax: 7,
      registered: [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      waitlistmax: 4,
      waitlisted: [],
      description: 'Tales Trees Tell is an adventure module set in the Forgotten Realms using the Dungeons & Dragons 5th edition ruleset. It is part of the Tyranny of Dragons series of adventures published for the D&D Adventurers League. It focuses on Phalan and is an adventure designed for three to seven 1st- to 4th-level characters.'
    }
  ];

  constructor(private userService: UserService) { }

  public registerGame(id: number): any {
    // TODO: Move this logic to the database

    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.allGames.length; ++i)
      {
        if (this.allGames[i].id === id)
        {
          if (this.allGames[i].registered.length < this.allGames[i].registermax)
          {
            this.allGames[i].registered.push(this.userService.getMyId());
            resolve();
            return;
          }

          if (this.allGames[i].waitlisted.length < this.allGames[i].waitlistmax)
          {
            this.allGames[i].waitlisted.push(this.userService.getMyId());
            resolve();
            return;
          }

          reject('Selected game is already full');
          return;
        }
      }

      reject('Could not game by provided ID (' + id + ')');
    });
  }

  public dropGame(id: number): any {
    return new Promise((resolve, reject) => {
      // TODO: Use the database to update and return response

      for (let i = 0; i < this.allGames.length; ++i)
      {
        if (this.allGames[i].id === id)
        {
          for (let j = 0; j < this.allGames[i].registered.length; ++j)
          {
            if (this.allGames[i].registered[j] === this.userService.getMyId())
            {
              this.allGames[i].registered.splice(j, 1);
              --j;
              resolve();
              return;
            }
          }
          for (let j = 0; j < this.allGames[i].waitlisted.length; ++j)
          {
            if (this.allGames[i].waitlisted[j] === this.userService.getMyId())
            {
              this.allGames[i].waitlisted.splice(j, 1);
              --j;
              resolve();
              return;
            }
          }

          reject('You were not registerd for that game');
          return;
        }
      }

      reject('Could not game by provided ID (' + id + ')');
    });
  }

  public getAllGames(): any
  {
    return new Promise((resolve, reject) => {
      // TODO: Use the database to get this list
      
      resolve(this.allGames);
    });
  }

  public getTypeList(): any
  {
    return new Promise((resolve, reject) => {
      // TODO: Use the current user type to determine what to list here
      let arr = [];
      arr.push({id: 1, text: 'All Games'});
      arr.push({id: 2, text: 'My Games'});

      resolve(arr);
    });
  }

  public getDMs(): any
  {
    return new Promise((resolve, reject) => {
      // TODO: Connect to the database to get this info

      let arr = [];
      arr.push({id: 1, text: 'Peter H.'});

      resolve(arr);
    });
  }

  public getSystems(): any
  {
    return new Promise((resolve, reject) => {
      // TODO: Connect to the database to get this info

      let arr = [];
      arr.push({id: 1, text: 'D&D 5e'});

      resolve(arr);
    });
  }
}
