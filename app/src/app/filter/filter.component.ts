import { GamesService } from './../games.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  public m_types: SelectItem[];
  public m_dms: SelectItem[];
  public m_systems: SelectItem[];
  public m_days: SelectItem[];
  public m_times: SelectItem[];

  private mm_filterStr;
  get m_filterStr(): string
  {
    return this.mm_filterStr;
  }
  set m_filterStr(val: string)
  {
    this.mm_filterStr = val;
    this.filterStrChange.emit(this.mm_filterStr);
  }
  public m_type;
  public m_dm;
  public m_system;
  public m_day;
  public m_time;
  private mm_openGames;
  get m_openGames(): boolean
  {
    return this.mm_openGames;
  }
  set m_openGames(val: boolean)
  {
    this.mm_openGames = val;
    this.openGamesChange.emit(this.mm_openGames);
  }

  @Input() filterStr;
  @Input() type;
  @Input() dm;
  @Input() system;
  @Input() day;
  @Input() time;
  @Input() openGames;
  @Output() filterStrChange = new EventEmitter<string>();
  @Output() typeChange = new EventEmitter<number>();
  @Output() dmChange = new EventEmitter<number>();
  @Output() systemChange = new EventEmitter<number>();
  @Output() dayChange = new EventEmitter<number>();
  @Output() timeChange = new EventEmitter<number>();
  @Output() openGamesChange = new EventEmitter<boolean>();

  constructor(
    private gamesService: GamesService,
    private messageService: MessageService
  ) {
    this.m_types = [
      {label: 'Any Type', value: {id: 0, name: 'Any', code: 'Any'}}
    ];
    this.m_dms = [
      {label: 'Any DM', value: {id: 0, name: 'Any', code: 'Any'}}
    ];
    this.m_systems = [
      {label: 'Any System', value: {id: 0, name: 'Any', code: 'Any'}}
    ];
    this.m_days = [
      {label: 'Any Day', value: {id: 0, name: 'Any', code: 'Any'}}
    ];
    this.m_times = [
      {label: 'Any Time', value: {id: 0, name: 'Any', code: 'Any'}}
    ];

    this.gamesService.getTypeList().then(
      (success) => {
        for (const it of success)
        {
          this.m_types.push(
            {label: it.text, value: {id: it.id, name: it.text, code: it.text}}
          );
        }
      }, (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Filter failure',
          detail: failure});
      }
    );

    this.gamesService.getDMs().then(
      (success) => {
        for (const it of success)
        {
          this.m_dms.push(
            {label: it.text, value: {id: it.id, name: it.text, code: it.text}}
          );
        }
      }, (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Filter failure',
          detail: failure});
      }
    );

    this.gamesService.getSystems().then(
      (success) => {
        for (const it of success)
        {
          this.m_systems.push(
            {label: it.text, value: {id: it.id, name: it.text, code: it.text}}
          );
        }
      }, (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Filter failure',
          detail: failure});
      }
    );

    this.gamesService.getDays().then(
      (success) => {
        for (const it of success)
        {
          this.m_days.push(
            {label: it.text, value: {id: it.id, name: it.text, code: it.text}}
          );
        }
      }, (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Filter failure',
          detail: failure});
      }
    );

    this.gamesService.getTimes().then(
      (success) => {
        for (const it of success)
        {
          this.m_times.push(
            {label: it.text, value: {id: it.id, name: it.text, code: it.text}}
          );
        }
      }, (failure) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Filter failure',
          detail: failure});
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.filterStr)
    {
      this.m_filterStr = changes.filterStr.currentValue;
    }
    if (changes.type)
    {
      if (changes.type.currentValue !== changes.type.previousValue)
      {
        for (const it of this.m_types)
        {
          if (it.value.id === changes.type.currentValue)
          {
            this.m_type = it.value;
            break;
          }
        }
      }
    }
    if (changes.dm)
    {
      if (changes.dm.currentValue !== changes.dm.previousValue)
      {
        for (const it of this.m_dms)
        {
          if (it.value.id === changes.dm.currentValue)
          {
            this.m_dm = it.value;
            break;
          }
        }
      }
    }
    if (changes.system)
    {
      if (changes.system.currentValue !== changes.system.previousValue)
      {
        for (const it of this.m_systems)
        {
          if (it.value.id === changes.system.currentValue)
          {
            this.m_system = it.value;
            break;
          }
        }
      }
    }
    if (changes.day)
    {
      if (changes.day.currentValue !== changes.day.previousValue)
      {
        for (const it of this.m_days)
        {
          if (it.value.id === changes.day.currentValue)
          {
            this.m_day = it.value;
            break;
          }
        }
      }
    }
    if (changes.time)
    {
      if (changes.time.currentValue !== changes.time.previousValue)
      {
        for (const it of this.m_times)
        {
          if (it.value.id === changes.time.currentValue)
          {
            this.m_time = it.value;
            break;
          }
        }
      }
    }
    console.log(changes);
  }

  public ddTypeChange(e): void
  {
    this.typeChange.emit(this.m_type.id);
  }

  public ddDmChange(e): void
  {
    this.dmChange.emit(this.m_dm.id);
  }

  public ddSystemChange(e): void
  {
    this.systemChange.emit(this.m_system.id);
  }

  public ddDayChange(e): void
  {
    this.dayChange.emit(this.m_day.id);
  }

  public ddTimeChange(e): void
  {
    this.timeChange.emit(this.m_time.id);
  }
}
