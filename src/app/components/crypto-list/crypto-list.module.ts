import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoListComponent } from './crypto-list.component';
import { CryptoDetailsModule } from '../crypto-details/crypto-details.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CryptoListComponent],
  imports: [
    CommonModule,
      RouterModule,
    CryptoDetailsModule,
    ReactiveFormsModule
  ],
  exports: [CryptoListComponent]
})
export class CryptoListModule { }