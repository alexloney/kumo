import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public UNKNOWN = 0;
  public USER = 1;
  public DM = 2;
  public ADMIN = 3;

  private userType: number = this.UNKNOWN;
  private name: string = '';
  private userId: number = 0;

  constructor(private db: DatabaseService) {}

  public getName(): string
  {
    return this.name;
  }

  public logout(): any
  {
    return new Promise((resolve, reject) => {
      this.db.logout().then(
        (success) => {

          // Clear any internal variables
          this.userType = this.UNKNOWN;
          this.name = '';
          this.userId = 0;

          resolve();
        },
        (failure) => {
          reject(failure);
        }
      );
    });
  }

  public login(id: string): any
  {
    return new Promise((resolve, reject) => {
      if (typeof id === 'undefined' || id.length === 0)
      {
        reject('No ID provided');
      }

      if (this.isNumeric(id) === false)
      {
        reject('ID was not a number');
      }

      this.db.loginUser(parseInt(id, 10)).then(
        (success: UserDetails) => {
          this.userType = success.type;
          this.userId = success.id;
          this.name = success.name;
          resolve();
        },
        (failure) => {
          reject(failure);
        }
      );
    });
  }

  public register(id: string, name: string): any
  {
    return new Promise((resolve, reject) => {

      if (typeof id === 'undefined' || id.length === 0)
      {
        reject('No ID provided');
      }

      if (typeof name === 'undefined' || name.length === 0)
      {
        reject('No name provided');
      }

      if (this.isNumeric(id) === false)
      {
        reject('ID was not a number');
      }

      this.db.registerUser(parseInt(id, 10), name).then(
        (success: UserDetails) => {
          this.userType = success.type;
          this.userId = success.id;
          this.name = success.name;
          resolve();
        },
        (failure) => {
          reject(failure);
        });
    });
  }

  public loggedIn(): boolean
  {
    return (this.userType !== this.UNKNOWN);
  }

  public isUser(): boolean
  {
    return (this.userType === this.USER);
  }

  public isDm(): boolean
  {
    return (this.userType === this.DM);
  }

  public isAdmin(): boolean
  {
    return (this.userType === this.ADMIN);
  }

  private isNumeric(str: any): boolean
  {
    if (typeof str !== "string") return false;
    return !isNaN(str as any) && !isNaN(parseFloat(str));
  }

  public getMyId(): number
  {
    return this.userId;
  }

  public getUserNames(ids: number[]): any
  {
    // TODO: Maybe parse response?
    return this.db.getUserNamesByIds(ids);
  }
}
