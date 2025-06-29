import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoDetailsModule } from '../crypto-details/crypto-details.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { CryptoListModule } from '../crypto-list/crypto-list.module';
import { WatchlistModule } from '../watchlist/watchlist.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    CryptoListModule,
    ReactiveFormsModule,
    WatchlistModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }