import { Injectable } from '@angular/core';
import { maxHeaderSize } from 'http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private allGames: GameData[] = [];
  private gameTypes: LookupType[] = [];
  private dms: LookupType[] = [];
  private gameSystems: LookupType[] = [];
  private days: LookupType[] = [];
  private times: LookupType[] = [];
  private allNames = {};

  constructor() {
    console.log('Resetting DB...');
    this.allGames = [];
    this.allGames.push({
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
        registered: [2, 3, 4],
        waitlistmax: 4,
        waitlisted: [],
        description: 'Tales Trees Tell is an adventure module set in the Forgotten Realms using the Dungeons & Dragons 5th edition ruleset. It is part of the Tyranny of Dragons series of adventures published for the D&D Adventurers League. It focuses on Phalan and is an adventure designed for three to seven 1st- to 4th-level characters.'
      });
    this.allGames.push({
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
        registered: [1, 2, 3, 4, 5, 6, 7],
        waitlistmax: 4,
        waitlisted: [],
        description: 'Tales Trees Tell is an adventure module set in the Forgotten Realms using the Dungeons & Dragons 5th edition ruleset. It is part of the Tyranny of Dragons series of adventures published for the D&D Adventurers League. It focuses on Phalan and is an adventure designed for three to seven 1st- to 4th-level characters.'
      });

    this.gameTypes = [];
    this.gameTypes.push({
      id: 1,
      text: 'All Games'
    });
    this.gameTypes.push({
      id: 2,
      text: 'My Games'
    });

    this.dms = [];
    this.dms.push({
      id: 1,
      text: 'Peter H.'
    });
    this.dms.push({
      id: 2,
      text: 'Kaddidlehopper'
    });

    this.gameSystems = [];
    this.gameSystems.push({
      id: 1,
      text: 'D&D 5e'
    });
    this.gameSystems.push({
      id: 2,
      text: 'Pathfinder'
    });

    this.days = [];
    this.days.push({
      id: 1,
      text: 'Friday'
    });
    this.days.push({
      id: 2,
      text: 'Saturday'
    });
    this.days.push({
      id: 3,
      text: 'Sunday'
    });

    this.times = [];
    this.times.push({
      id: 1,
      text: '8:00 am'
    });
    this.times.push({
      id: 2,
      text: '8:30 am'
    });
    this.times.push({
      id: 3,
      text: '9:00 am'
    });
    this.times.push({
      id: 4,
      text: '9:30 am'
    });
    this.times.push({
      id: 5,
      text: '2:00 pm'
    });

    this.allNames = {};
    this.allNames[1] = 'Alex';
    this.allNames[2] = 'John';
    this.allNames[3] = 'Chad';
    this.allNames[4] = 'Brandon';
    this.allNames[5] = 'Sarah';
    this.allNames[6] = 'She-Ra';
    this.allNames[7] = 'Smith';
    this.allNames[8] = 'Dick';
    this.allNames[9] = 'Johnson';
    this.allNames[10] = 'Clark';
    this.allNames[11] = 'Klarc';
    this.allNames[12] = 'Klim';
  }

  public registerUserForGame(userId: number, gameId: number): any
  {
    // TODO: Replace the below call with an actual DB call
    return new Promise((resolve, reject) => {
      for (const game of this.allGames)
      {
        if (game.id === gameId)
        {
          if (game.registered.length < game.registermax)
          {
            game.registered.push(userId);
            resolve();
            return;
          }

          if (game.waitlisted.length < game.waitlistmax)
          {
            game.waitlisted.push(userId);
            resolve();
            return;
          }

          reject('Selected game is already full');
          return;
        }
      }

      reject('Could not game by provided ID (' + gameId + ')');
    });
  }

  public dropUserFromGame(userId: number, gameId: number): any
  {
    // TODO: Replace this with a call to the database

    return new Promise((resolve, reject) => {
      for (const game of this.allGames)
      {
        if (game.id === gameId)
        {
          for (let j = 0; j < game.registered.length; ++j)
          {
            if (game.registered[j] === userId)
            {
              game.registered.splice(j, 1);
              --j;
              resolve();
              return;
            }
          }
          for (let j = 0; j < game.waitlisted.length; ++j)
          {
            if (game.waitlisted[j] === userId)
            {
              game.waitlisted.splice(j, 1);
              --j;
              resolve();
              return;
            }
          }

          reject('You were not registerd for that game');
          return;
        }
      }

      reject('Could not game by provided ID (' + gameId + ')');
    });
  }

  public getAllGames(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.allGames);
    });
  }

  public getAllGameTypes(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.gameTypes);
    });
  }

  public getAllDms(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.dms);
    });
  }

  public getAllGameSystems(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.gameSystems);
    });
  }

  public getAllGameDays(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.days);
    });
  }

  public getAllGameTimes(): any {
    // TODO: Replace with call to actual database
    return new Promise((resolve, reject) => {
      resolve(this.times);
    });
  }

  public logout(): any {
    return new Promise((resolve, reject) => {
      // TODO: Send command to end session to DB
      resolve();
    });
  }

  public loginUser(userId: number): any {
    console.log('loginUser()');
    return new Promise((resolve, reject) => {
      if (!(userId in this.allNames)) {
        reject('Unknown User ID');
        return;
      }

      const userDetails: UserDetails = {
        id: userId,
        kumoId: 10482546,
        type: 1,
        name: 'Alex'
      };

      resolve(userDetails);
    });
  }

  public registerUser(kumoId: number, name: string): any {
    return new Promise((resolve, reject) => {

      if (kumoId in this.allNames)
      {
        reject('User ID already exists');
        return;
      }

      const response: UserDetails = {
        id: kumoId,
        kumoId: kumoId,
        type: 1,
        name: name
      };

      this.allNames[kumoId] = name;

      resolve(response);
    });
  }

  public getUserNamesByIds(ids: number[]): any {
    return new Promise((resolve, reject) => {
      const response = {};
      for (const id of ids)
      {
        if (!(id in this.allNames)) {
          const err = 'Unable to locate user ' + id;
          console.error(err);
          reject(err);
          return;
        }

        response[id] = this.allNames[id];
      }

      resolve(response);
    });
  }
}
