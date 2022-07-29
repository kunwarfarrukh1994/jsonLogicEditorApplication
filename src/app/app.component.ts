import { Component } from '@angular/core';
import { interval, lastValueFrom, take } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-jsonlogic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jsonLogicEditorApplication';
 //logic=`{"and":[{"==":[{"var":"Name"},{"cat":["farrukh ","khan"]}]}]}`;
// logic="";
logic=`{"and":[{"==":[{"substring":["ffff",{"var":"SubjectPhoneNumber"},null]},"sssss"]}]}`;

functions:any=[];
variables:any=[];
constructor(private ss:AppService){
   this.getfunctions();
}

async getfunctions()
{
  this.functions= await lastValueFrom(this.ss.getfunctions());
  this.variables=await lastValueFrom(this.ss.getCheckExpressionFieldsList());
}

}
