import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visible: boolean = false;

  constructor() { }

  public showSpinner(): void
  {
    this.visible = true;
  }

  public hideSpinner(): void
  {
    this.visible = false;
  }

  public isVisible(): boolean
  {
    return this.visible;
  }
}
