import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
     selector: 'app-input-form',
     templateUrl: './input-form.component.html',
     styleUrl: './input-form.component.css'
})
export class InputFormComponent {

     form: FormGroup;
     companyName: string = "";
     description: string = "";
     faceBookURL: string = "";
     linkedInURL: string = "";
     twitterURL: string = "";
     instagramURL: string = "";
     address: string = "";
     phoneNumber: string = "";
     email: string = "";
     file: any = "";
     socialMediaLogo: string = "";

     constructor(
          private fb: FormBuilder,
          public dialogRef: MatDialogRef<InputFormComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any,
          private apiService: ApiService
     ) {
          this.form = this.fb.group({
               logo: ['', Validators.required],
               companyName: ['', Validators.required],
               socialMediaLogo: ['', Validators.required],
               description: ['', Validators.required],
               address: ['', Validators.required],
               phoneNumber: ['', Validators.required],
               email: ['', Validators.required]
          });
     }

     onCancel(): void {
          this.dialogRef.close();
     }

     onSubmit(): void {
          const formData = new FormData();
          formData.append('companyName', this.companyName);
          formData.append('description', this.description);
          formData.append('faceBookURL', this.faceBookURL);
          formData.append('linkedInURL', this.linkedInURL);
          formData.append('instagramURL', this.instagramURL);
          formData.append('address', this.address);
          formData.append('phoneNumber', this.phoneNumber);
          formData.append('email', this.email);
          formData.append('socialMediaLogo', this.socialMediaLogo);
          formData.append('logo', this.file, this.file.name);
          console.log(formData)
          this.apiService.createData(formData).subscribe(res => {
               console.log("post response", res)
               this.dialogRef.close(formData);
          }, error => {
               console.log("error", error)
          })
     }

     onFileChange(event: any) {
          this.file = event.target.files[0];
     }
}
