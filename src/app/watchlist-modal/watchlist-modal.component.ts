import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-watchlist-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './watchlist-modal.component.html',
  styleUrl: './watchlist-modal.component.scss'
})
export class WatchlistModalComponent {
       constructor(
        public dialogRef: MatDialogRef<WatchlistModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {}

      onCloseClick(): void {
        this.dialogRef.close();
      }
}
