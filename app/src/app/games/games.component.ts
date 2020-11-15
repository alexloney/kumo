import { UserService } from './../user.service';
import { MessageService } from 'primeng/api';
import { GamesService } from './../games.service';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnChanges {

  @Input() filterStr: string;
  @Input() type: number;
  @Input() dm: number;
  @Input() system: number;
  @Input() day: number;
  @Input() time: number;
  @Input() openGames: boolean;

  private FT_ANY = 0;
  private FT_ALL = 1;
  private FT_MY = 2;

  public m_filterStr: string;
  public m_type: number;
  public m_dm: number;
  public m_system: number;
  public m_day: number;
  public m_time: number;
  public m_openGames: boolean;

  public m_allGames: GameData[];

  public m_filteredGames: GameData[];

  constructor(private gamesService: GamesService,
    private messageService: MessageService,
    public userService: UserService) {

      this.refreshGames();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.filterStr)
    {
      this.m_filterStr = changes.filterStr.currentValue;
    }
    if (changes.type)
    {
      this.m_type = changes.type.currentValue;
    }
    if (changes.dm)
    {
      this.m_dm = changes.dm.currentValue;
    }
    if (changes.system)
    {
      this.m_system = changes.system.currentValue;
    }
    if (changes.day)
    {
      this.m_day = changes.day.currentValue;
    }
    if (changes.time)
    {
      this.m_time = changes.time.currentValue;
    }
    if (changes.openGames)
    {
      this.m_openGames = changes.openGames.currentValue;
    }

    this.applyGameFilter();
  }

  private refreshGames(): void {
    this.gamesService.getAllGames().then(
      (success) => {
        this.m_allGames = success;
        this.applyGameFilter();
      },
      (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Getting Games Failure',
          detail: failure});
      }
    );
  }

  public applyGameFilter(): void
  {
    this.m_filteredGames = [];
    for (const game of this.m_allGames)
    {
      let pass = true;
      if (typeof this.m_dm !== 'undefined' && this.m_dm !== 0)
      {
        if (game.dmid !== this.m_dm)
        {
          pass = false;
        }
      }

      if (typeof this.m_system !== 'undefined' && this.m_system !== 0)
      {
        if (game.systemid !== this.m_system)
        {
          pass = false;
        }
      }

      if (typeof this.m_day !== 'undefined' && this.m_day !== 0)
      {
        if (game.dayid !== this.m_day)
        {
          pass = false;
        }
      }
      
      if (typeof this.m_time !== 'undefined' && this.m_time !== 0)
      {
        if (game.timeid !== this.m_time)
        {
          pass = false;
        }
      }

      if (typeof this.m_filterStr !== 'undefined' && this.m_filterStr.length > 0)
      {
        const tmpStr = this.m_filterStr.toLowerCase().replace(/\W/g, '');
        const tmpTitle = game.title.toLowerCase().replace(/\W/g, '');
        const tmpDesc = game.description.toLowerCase().replace(/\W/g, '');

        if (!tmpTitle.includes(tmpStr) &&
            !tmpDesc.includes(tmpStr))
        {
          pass = false;
        }
      }

      if (typeof this.m_openGames !== 'undefined' && this.m_openGames)
      {
        if (game.registered.length >= game.registermax)
        {
          pass = false;
        }
      }

      if (typeof this.m_type !== 'undefined' && this.m_type === this.FT_MY)
      {
        let myId = this.userService.getMyId();
        if (!(game.registered.includes(myId) ||
            game.waitlisted.includes(myId)))
        {
          pass = false;
        }
      }

      if (pass)
      {
        game.refresh += 1;
        this.m_filteredGames.push(game);
      }
    }
  }

  public registerGame(e: Event, game: GameData): void
  {
    console.log('Emitting register');
    this.gamesService.registerGame(game.id).then(
      (success) => {
        this.refreshGames();
      },
      (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Register Error',
          detail: failure});
      }
    );
  }

  public registerGameById(id: number): void
  {
    let found = false;
    for (const game of this.m_allGames)
    {
      if (game.id === id)
      {
        found = true;
        this.registerGame(null, game);
        break;
      }
    }

    if (!found)
    {
      this.messageService.add({
        severity: 'error',
        summary: 'Register Error',
        detail: 'Unable to locate game with ID ' + id});
    }
  }

  public dropGame(e: Event, game: GameData): void
  {
    console.log('Emitting drop');
    this.gamesService.dropGame(game.id).then(
      (success) => {
        this.refreshGames();
      },
      (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Register Error',
          detail: failure});
      }
    );
  }

  public dropGameById(id: number): void
  {
    let found = false;
    for (const game of this.m_allGames)
    {
      if (game.id === id)
      {
        found = true;
        this.dropGame(null, game);
        break;
      }
    }

    if (!found)
    {
      this.messageService.add({
        severity: 'error',
        summary: 'Register Error',
        detail: 'Unable to locate game with ID ' + id});
    }
  }

}
