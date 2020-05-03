import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
mySubject : Subject<any> = new Subject<any>();
myData : any ;

myDataSetter(data : any){
 this.myData = data;
 this.mySubject.next(this.myData);
}
  personid:number

  constructor() { }
}
