

import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RESTAPIService } from '../restapiservice.service';
import { Router } from "@angular/router"
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatTable, } from '@angular/material/table';



import { formData } from '../formData';
import { PoetryData } from '../poetryData';
import { outputAst } from '@angular/compiler';
//<form [formGroup]="options" (ngSubmit)="onSubmit()" #form="ngForm" method="GET">

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public response: Array<any> = []
  model = new formData('', '');
  constructor(private service: RESTAPIService, private router: Router) { }
  data = PoetryData;
  arr = new Array<PoetryData>();
  newItems = {};




  ngOnInit(): void {
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  groupByAuthor(array: any) {
    return array.reduce((r: any, a: any) => {
      r[a.author] = r[a.author] || [];
      r[a.author].push(a);
      return r;
    }, Object.create(null));
  }

  groupByTitle(array: any) {
    return array.reduce((r: any, a: any) => {
      r[a.title] = r[a.title] || [];
      r[a.title].push(a);
      return r;
    }, Object.create(null));
  }


  log(val: any) { console.log(val); }


  /*
  The following 3 meothods handles our queries.
  they start by checking to see if the call returned an error and then checking if the api returned anything other then a 200 error
  If there is an error an alert is displayed. otherwise the data is grouped by authors then displayed
  To see the poem lines click on the entry you want.
  

  Worth noting DO NOT SEARCH FOR titles with simile words the the work 'the' it will slow way down
   */



  //takes both user input (author and title )
  getData() {
    this.newItems = {};
    this.arr.length = 0;
    this.service.getData(this.model).subscribe((data: any) => {
      if (data.status == 200) {
        if (!(data.body.status == 200) && data.body.status != null) {
          console.log(data.body);



          alert("API returned error code " + data.body.status + "\n\n" + data.body.reason);
        } else {
          console.log(data.body);
          for (var i = 0; i < data.body.length; i++) {
            //console.log(data.body[i].author);

            const category: PoetryData = {
              author: data.body[i].author,
              title: data.body[i].title,
              linecount: data.body[i].linecount,
              lines: data.body[i].lines,
            };
            this.arr.push(category)
          }
          this.newItems = this.groupByAuthor(this.arr);
        }
      }
    }, (err) => {
      alert("Call returned the error code" + err.status);
    });
  }


  //Method uses only user input for author to get titles
  getAuthorData() {
    this.newItems = {};
    this.arr.length = 0;
    this.service.getAuthorData(this.model).subscribe((data: any) => {
      if (data.status == 200) {
        if (!(data.body.status == 200) && data.body.status != null) {
          console.log(data.body);
          alert("API returned error code " + data.body.status + "\n\n" + data.body.reason);
        } else {
          console.log(data.body);
          for (var i = 0; i < data.body.length; i++) {
            //console.log(data.body[i].author);

            const category: PoetryData = {
              author: data.body[i].author,
              title: data.body[i].title,
              linecount: data.body[i].linecount,
              lines: data.body[i].lines,
            };
            this.arr.push(category)
          }
          this.newItems = this.groupByAuthor(this.arr);
        }
      }
    }, (err) => {
      alert("Call returned error code " + err.status + "\n\n" + err.body);
      console.log(err);
    });
  }


  //method searches for titles that match any part of user input
  getTitleData() {
    this.newItems = {};
    this.arr.length = 0;
    this.service.getTitleData(this.model).subscribe((data: any) => {
      if (data.status == 200) {
        if (!(data.body.status == 200) && data.body.status != null) {
          console.log(data.body);
          alert("API returned error code " + data.body.status + "\n\n" + data.body.reason);
        } else {
          console.log(data.body);
          for (var i = 0; i < data.body.length; i++) {
            //console.log(data.body[i].author);

            const category: PoetryData = {
              author: data.body[i].author,
              title: data.body[i].title,
              linecount: data.body[i].linecount,
              lines: data.body[i].lines,
            };
            this.arr.push(category)
          }
          this.newItems = this.groupByAuthor(this.arr);
        }
      }
    }, (err) => {
      alert("Call returned error code " + err.status + "\n\n" + err.body);
      console.log(err);
    });
  }



}
