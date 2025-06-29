import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';
import { CryptoApiService } from 'src/app/service/crypto-api.service';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit{
    coins: Coin[] = [];
  loading = false;

  constructor(
    private watchlistService: WatchlistService,
    private cryptoApi: CryptoApiService,
      private router: Router
  ) { }
  
  ngOnInit() {
    this.watchlistService.watchlist$.subscribe(ids => {
      if (ids.length === 0) {
        this.coins = [];
        return;
      }
      this.loading = true;
      this.cryptoApi.getCryptoList(1, 250).subscribe((data: Coin[]) => {
        this.coins = data.filter(coin => ids.includes(coin.id));
        this.loading = false;
      
      });
    });
  }
    remove(id: string) {
    this.watchlistService.removeFromWatchlist(id);
  }

   goToCoinDetails(coin: Coin) { 
    this.router.navigate(['/details', coin.id]);
  }
}
