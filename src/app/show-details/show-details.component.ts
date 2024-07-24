import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
     selector: 'app-show-details',
     templateUrl: './show-details.component.html',
     styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent {


     constructor(
          public dialogRef: MatDialogRef<ShowDetailsComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any
     ) { }

     ngOnInit() {
          console.log(this.data)
     }
}
