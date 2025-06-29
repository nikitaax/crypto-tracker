import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coin } from '../models/coin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private baseUrl = 'https://api.coingecko.com/api/v3/';

  constructor(private http: HttpClient) { }

  getCryptoList(page: number=1, perPage:number=10):Observable<Coin[]> { 
    return this.http.get<Coin[]>(`${this.baseUrl}coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage.toString(),
        page: page.toString(),
        sparkline: 'false'
      }
    });
  }
  
  getCoinDetails(id: string) {
  return this.http.get(`${this.baseUrl}coins/${id}`);
  }
  
  getCoinHistory(id: string, vs_currency: string, days: number) {
    return this.http.get<any>(`${this.baseUrl}coins/${id}/market_chart`, {
      params: {
        vs_currency,
        days: days.toString()
      }
    });
  }
}
