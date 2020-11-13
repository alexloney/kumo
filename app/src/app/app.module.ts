import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DMComponent } from './dm/dm.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { SpinnerComponent } from './spinner/spinner.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DMLoginComponent } from './dmlogin/dmlogin.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DMComponent,
    UserComponent,
    SpinnerComponent,
    AdminLoginComponent,
    DMLoginComponent,
    FilterComponent,
    GamesComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    ProgressSpinnerModule,
    ToastModule,
    CommonModule,
    DropdownModule,
    CheckboxModule,
    DialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
