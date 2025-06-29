import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor() { }

  private watchlistKey = 'watchlist';
  private watchlistSubject = new BehaviorSubject<string[]>(this.loadWatchlist());

  watchlist$ = this.watchlistSubject.asObservable();

  private loadWatchlist(): string[] {
    return JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');

  }

  addToWatchlist(id: string){
    const current = this.watchlistSubject.value;
    if(!current.includes(id)){
      const updated = [...current, id];
      this.watchlistSubject.next(updated);
      localStorage.setItem(this.watchlistKey, JSON.stringify(updated));
    }
  }

  removeFromWatchlist(id: string){
    const updated = this.watchlistSubject.value.filter((item: string) => item !== id); 
    this.watchlistSubject.next(updated);
    localStorage.setItem(this.watchlistKey, JSON.stringify(updated));
  }
}
