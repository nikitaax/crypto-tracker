import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist.component';
import { CryptoDetailsModule } from '../crypto-details/crypto-details.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WatchlistComponent],
  imports: [
    CommonModule,
      RouterModule,
    CryptoDetailsModule,
    ReactiveFormsModule
  ],
  exports: [WatchlistComponent]
})
export class WatchlistModule { }