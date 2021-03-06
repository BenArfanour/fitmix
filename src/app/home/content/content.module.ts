import { NgModule } from '@angular/core';
 import {ContentComponent} from './content.component'
import {ContentRoutingModule  } from "./content-routing.module";
 import { WebcamModule} from './webcam/webcam.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {WebcamComponent} from './webcam/webcam/webcam.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    ContentRoutingModule,
    CommonModule,
    FormsModule,
    WebcamModule,
        //Specify ng-circle-progress as an import
        NgCircleProgressModule.forRoot({
          // set defaults here
          radius: 100,
          outerStrokeWidth: 16,
          innerStrokeWidth: 8,
          outerStrokeColor: "#78C000",
          innerStrokeColor: "#C7E596",
          animationDuration: 300,
        })
  ],
  declarations: [ContentComponent],
  providers: [WebcamComponent],
})


export class ContentModule { }

