import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoDetailsComponent } from './crypto-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [CryptoDetailsComponent],
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  exports: [CryptoDetailsComponent]
})
export class CryptoDetailsModule { }