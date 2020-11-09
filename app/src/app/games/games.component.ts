import { MessageService } from 'primeng/api';
import { GamesService } from './../games.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  @Input() openGames: boolean;

  private FT_ANY = 0;
  private FT_ALL = 1;
  private FT_MY = 2;

  public m_filterStr: string;
  public m_type: number;
  public m_dm: number;
  public m_system: number;
  public m_openGames: boolean;

  public m_allGames: GameData[];

  public m_filteredGames: GameData[];

  constructor(private gamesService: GamesService,
    private messageService: MessageService) {
    this.gamesService.getAllGames().then(
      (success) => {
        this.m_allGames = success;
      },
      (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Getting Games Failure',
          detail: failure});
      }
    );
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
    if (changes.openGames)
    {
      this.m_openGames = changes.openGames.currentValue;
    }

    this.applyGameFilter();
  }

  public applyGameFilter(): void
  {
    this.m_filteredGames = [];
    for (const game of this.m_allGames)
    {
      let pass = true;
      if (this.m_dm !== 0)
      {
        if (game.dmid !== this.m_dm)
        {
          pass = false;
        }
      }

      if (this.m_system !== 0)
      {
        if (game.systemid !== this.m_system)
        {
          pass = false;
        }
      }

      if (this.m_filterStr.length > 0)
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

      if (this.m_openGames)
      {
        if (game.registered.length >= game.registermax)
        {
          pass = false;
        }
      }

      if (this.m_type === this.FT_MY)
      {
        // TODO: Need to check if my user ID is in the
        //       game.registered or game.waitlisted arrays
      }

      if (pass)
      {
        this.m_filteredGames.push(game);
      }
    }
  }

}
