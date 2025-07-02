import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from 'src/app/service/crypto-api.service';
import { CoinDetails } from 'src/app/models/coin';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexTooltip,
  ApexYAxis,
} from 'ng-apexcharts';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WatchlistModalComponent } from 'src/app/watchlist-modal/watchlist-modal.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
};

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss'],
})
export class CryptoDetailsComponent implements OnInit {
  coinId: string | null = null;
  coin: CoinDetails | null = null;
  chartOptions: Partial<ChartOptions> | null = null;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoApiService,
    private watchlistService: WatchlistService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const coinId = this.route.snapshot.paramMap.get('id');
    if (coinId) {
      this.coinId = coinId;

      this.cryptoService.getCoinDetails(this.coinId).subscribe((data: any) => {
        this.coin = data as CoinDetails;
      });
    }
    this.getChart();
  }

  getChart() {
    if (!this.coinId) {
      return;
    }
    this.cryptoService
      .getCoinHistory(this.coinId, 'usd', 7)
      .subscribe((chartData) => {
        const prices = chartData.prices.map((p: any) => ({
          x: new Date(p[0]),
          y: p[1],
        }));
        this.chartOptions = {
          series: [
            {
              name: 'Price',
              data: prices,
            },
          ],
          chart: {
            type: 'line',
            height: 300,
            background: '#181818',
          },
          xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#fff' } },
          },
          yaxis: {
            labels: {
              style: { colors: '#fff' },
              formatter: function (value: number) {
                return (
                  '$' +
                  value.toLocaleString('en-US', { maximumFractionDigits: 2 })
                );
              },
            },
            title: {
              text: 'Price (USD)',
              style: { color: '#fff' },
            },
          },
          title: {
            text: '7-Day Price Chart',
            style: { color: '#fff' },
          },
        };
      });
  }

  addToWatchlist() {
    if (this.coin) {
      this.watchlistService.addToWatchlist(this.coin.id);
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(WatchlistModalComponent, {
      width: '400px',
      panelClass: 'blue-black-modal',
      data: {
        title: 'Add to Watchlist',
        message: `Do you want to add ${this.coin?.name} to your watchlist?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addToWatchlist();
        this.snackBar.open(
          `${this.coin?.name} added to your watchlist!`,
          'Close',
          {
            duration: 3000,
            panelClass: ['snackbar-dark'], // Optional: for dark theme
          }
        );
      }
    });
  }
}
