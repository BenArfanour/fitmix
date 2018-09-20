import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from "./webcam/domain/webcam-image";
import {WebcamUtil} from "./webcam/util/webcam.util";
import {WebcamInitError} from "./webcam/domain/webcam-init-error";
import {WebcamComponent} from "./webcam/webcam/webcam.component"

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

// toggle webcam on/off
showWebcam = false;
slect:any =[];
 allowCameraSwitch = true;
 multipleWebcamsAvailable = false;
 isMiddleDivVisible: boolean = false;
 deviceId: any;
 registerForm = false;
 videostream  :boolean
timeLeft: number = 3;
height = 500;
width = 500;
slim: any
interval;
videosrc:any;
percent : number = 0;
captures : Array<any> =[] ;
 videoOptions: MediaTrackConstraints = {
  //width: {ideal: 1024},
  //height: {ideal: 576}
};
 errors: WebcamInitError[] = [];

// latest snapshot
 webcamImage: WebcamImage = null;

// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();
// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

constructor( private webcam :WebcamComponent) {}

 ngOnInit() {

  WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      
    });
}

 triggerSnapshot() {

  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
      this.percent ++;
      this.isMiddleDivVisible =true;
      this.registerForm =true
    } else if(this.percent === 3) {
      this.trigger.next();
      this.isMiddleDivVisible =false
    }
    if (this.captures.length === 3){
      clearInterval(this.interval);
    }

  },1000)


}

 toggleWebcam() {

  this.showWebcam = !this.showWebcam;

}

 handleInitError(error: WebcamInitError) {
  this.errors.push(error);
}

 showNextWebcam(directionOrDeviceId: boolean|string) {
  // true => move forward through devices
  // false => move backwards through devices
  // string => move to device with given deviceId
  this.nextWebcam.next(directionOrDeviceId);
  this.slect = this.nextWebcam.next(directionOrDeviceId);
}

 handleImage(webcamImage: WebcamImage) {
  console.info("received webcam image", webcamImage);
  this.webcamImage = webcamImage;
  this.captures.push(this.webcamImage);
  console.log(this.captures);
}

 cameraWasSwitched(deviceId: string) {
  console.log("active device: " + deviceId);
  this.deviceId=deviceId;

}

 get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

 get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}

save_image (){
  try {
// Stores the JavaScript object as a string
localStorage.setItem("slim", JSON.stringify(this.captures));

// Parses the saved string into a JavaScript object again 
JSON.parse(localStorage.getItem("slim"));
}
catch (e) {
    console.log("Storage failed: " + e);
}
}

}
