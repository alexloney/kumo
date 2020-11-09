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

  constructor() {}

  public getName(): string
  {
    return this.name;
  }

  public logout(): any
  {
    return new Promise((resolve, reject) => {
      this.userType = this.UNKNOWN;
      this.name = '';

      resolve();

      // TODO: Implement database communication for logging out
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

      // TODO: Perform actual DB communication to log user in
      this.userType = this.USER;
      this.name = 'Alex';
      resolve();
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

      // TODO: Perform actual DB communication to register user
      this.userType = this.USER;
      resolve();
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
}
