import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputFormComponent } from '../input-form/input-form.component';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ShowDetailsComponent } from '../show-details/show-details.component';

export interface PeriodicElement {
     _id: any;
     position: number;
     company: string;
     socialProfiles: string;
     description: string;
     address: string;
     phoneNumber: number;
     email: string;
}

@Component({
     selector: 'app-home',
     templateUrl: './home.component.html',
     styleUrl: './home.component.css',

})
export class HomeComponent {
     displayedColumns: string[] = ['checkbox', 'logo', 'company', 'socialProfiles', 'description', 'address', 'phoneNumber', 'email'];
     dataSource: any
     dataSources: any;
     selectedRowId: any;
     searchTerm: any;
     selection = new SelectionModel<PeriodicElement>(true, []);
     allDataSaved: any;
     constructor(public dialog: MatDialog, private apirService: ApiService) { }

     ngOnInit() {
          this.apirService.getAllData().subscribe(res => {
               console.log(res)
               this.dataSource = res
               this.allDataSaved = this.dataSource
               this.dataSources = new MatTableDataSource<PeriodicElement>(this.dataSource);
          })
     }

     openDialogForm(): void {
          const dialogRef = this.dialog.open(InputFormComponent, {
               width: '750px',
               height: '500px',
               data: {}
          });

          dialogRef.afterClosed().subscribe(result => {
               if (result) {
                    console.log('Form Data:', result);
                    this.getdata()
               }
          });
     }

     openDialogDetail(element: any): void {
          const dialogRef = this.dialog.open(ShowDetailsComponent, {
               width: '1000px',
               height: '600px',
               data: element
          });

          dialogRef.afterClosed().subscribe(result => {
               if (result) {
                    console.log('Form Data:', result);
                    this.getdata()
               }
          });
     }

     getdata() {
          this.apirService.getAllData().subscribe(res => {
               console.log(res)
               this.dataSource = res

          })
     }

     showOptions(event: any) {
          console.log()
     }

     deleteData() {
          let ids: any = []
          if (this.selectedRowId) {
               this.selectedRowId.filter((element: any) => {
                    this.dataSource.filter((dataElement: any) => {
                         if (element._id == dataElement._id) {
                              ids.push(element._id)
                         }
                    })
               })
               console.log(ids)
          }

          if (ids.length) {
               this.apirService.deleteData({ ids }).subscribe(res => {
                    console.log(res)
                    if (res) {
                         this.getdata()
                    }
               }, error => {
                    console.log(error)
               })
          }

     }

     isAllSelected() {
          console.log('allselected')
          this.selectedRowId = this.selection.selected.filter((element) => {
               return element._id
          })
          console.log("selectedId", this.selectedRowId)
          const numSelected = this.selection.selected.length;
          const numRows = this.dataSources.data.length;
          return numSelected === numRows;
     }

     /** Selects all rows if they are not all selected; otherwise clear selection. */
     masterToggle(id?: any) {
          // if there is a selection then clear that selection
          console.log("mastertoggle", id)
          if (this.isSomeSelected()) {
               this.selection.clear();
          } else {
               this.isAllSelected()
                    ? this.selection.clear()
                    : this.dataSources.data.forEach((row: PeriodicElement) => this.selection.select(row));
          }
     }

     isSomeSelected() {
          console.log('issomeselected', this.selection.selected);
          return this.selection.selected.length > 0;
     }

     downloadCsv() {
          var options = {
               fieldSeparator: ',',
               quoteStrings: '"',
               decimalseparator: '.',
               showLabels: true,
               showTitle: true,
               title: 'wevSite Scrapping',
               useBom: true,
               headers: ["Id", "Logo", "Company", "Social Profiles", "Description", "FaceBook", "LinkedIn", "Instagram", "Address", "Phone Number", "Email"]
          };

          new ngxCsv(this.dataSource, "scrapping", options);
     }

     onChange() {
          this.dataSource = this.allDataSaved
          let fildata = this.dataSource.filter((data: { companyName: string; }) => data.companyName.toLowerCase().includes(this.searchTerm?.toLowerCase()))
          console.log(fildata)
          this.dataSource = fildata
          if (this.searchTerm == "" || this.searchTerm == undefined) {
               this.dataSource = this.allDataSaved
          }
     }
}
