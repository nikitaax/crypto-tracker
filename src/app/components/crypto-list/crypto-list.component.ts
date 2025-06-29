import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, BehaviorSubject } from 'rxjs';
import { Coin } from 'src/app/models/coin';
import { CryptoApiService } from 'src/app/service/crypto-api.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  constructor(private cryptoService: CryptoApiService,
    private router: Router
  ) { }

  coinList: Coin[] = [];
  filteredCoinList: Coin[] = [];
  searchControl = new FormControl('');
  currentPage: number = 1;
  perPage = 10;

  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  ngOnInit(): void {
    this.getCryptoList();
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.filteredCoinList = this.coinList.filter(coin =>
        coin.name.toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    
    });
  }

    getCryptoList(page: number = 1) {
    this.loading$.next(true);
    this.cryptoService.getCryptoList(page, this.perPage).subscribe(
      (data: Coin[]) => {
        this.coinList = data as Coin[];
        this.filteredCoinList = data as Coin[];
        this.loading$.next(false);
        this.error$.next(null);
      },
      () => {
        this.loading$.next(false);
        this.error$.next('Failed to load data.');
      }
    );
  }

  goToCoinDetails(coin: Coin) { 
    this.router.navigate(['/details', coin.id]);
  }

  goToPage(page: number) {
  if (page < 1) return;
  this.currentPage = page;
  this.getCryptoList(page);
}
 }      
