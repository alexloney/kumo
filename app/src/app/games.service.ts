import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  public getAllGames(): any
  {
    return new Promise((resolve, reject) => {
      // TODO: Use the database to get this list
      const arr: GameData[] = [];
      arr.push(
        {
          id: 1,
          title: 'Tales Trees Tell',
          systemid: 1,
          dmid: 1,
          dayid: 1,
          timeid: 1,
          registermax: 7,
          registered: [
            1,
            2,
            3
          ],
          waitlistmax: 4,
          waitlisted: [],
          description: ''
        }
      );

      resolve(arr);
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
