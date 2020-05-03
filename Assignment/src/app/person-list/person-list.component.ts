import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
declare let $: any;

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  constructor(private dataservice:DataService) { }
  personData:{}
  personID:number;
  onPersonInfoClick(id){
    // alert(id)
this.personID=id;
this.dataservice.personid=id

this.dataservice.myDataSetter(id);
$('#myModal').modal('show')

  }

  onUpdated(data){
    $('#myModal').modal('hide')
  }


  ngOnInit() {
   
  }

  ngDoCheck() {
    if(localStorage.getItem('personDetail')!=null||localStorage.getItem('personDetail')!=undefined)
    this.personData=JSON.parse(localStorage.getItem('personDetail'))

  }

}
