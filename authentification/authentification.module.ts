import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import {AuthRoutingModule} from "./auth-routing.module"
 import { AuthentificationComponent}  from "./authentification.component"
@NgModule({
  imports: [
    AuthRoutingModule
  ],
  declarations: [AuthentificationComponent]
})
export class AuthentificationModule { }
