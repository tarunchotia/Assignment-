import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  constructor(private dataservice:DataService,private router:Router) { 
    console.log(this.dataservice.personid)
    this.dataservice.mySubject.subscribe((data) => {
      this.dataShow(data);
     })

  }
  
  
  @Input() addPerson:boolean=true;
  id:any;
  @Output() updated = new EventEmitter<boolean>();
  personDetailForm;
  titleText="Person Registration"

  avatarSrc:any

  createForm(){

  this.personDetailForm=new FormGroup({
    personName:new FormControl('',Validators.required),
    countryCode:new FormControl('',Validators.required),
    dob:new FormControl('',Validators.required),


  }
  )


}

personDetail={
  records:[

  ]
}
readURL(event: Event): void {
  if (event.target["files"] && event.target["files"][0]) {
      const file = event.target["files"][0];

      const reader = new FileReader();
      reader.onload = e => 
      {this.avatarSrc = reader.result};

      reader.readAsDataURL(file);
   
    
  }
}
Add(){
    if(this.personDetailForm.valid){

  if(localStorage.getItem('personDetail')==null){
    localStorage.setItem("personDetail",JSON.stringify(this.personDetail))
  }

    var recordPersons=localStorage.getItem('personDetail')
    
    this.personDetail=JSON.parse(recordPersons)
    var id=this.personDetail.records.length+1;
    var tempDetails={}
    tempDetails=this.personDetailForm.value;
    tempDetails["id"]=id;
    if(this.avatarSrc){
      tempDetails["avatar"]=this.avatarSrc
    }
    else{
      tempDetails["avatar"]='http://placehold.it/180'

    }
    this.personDetail.records.push(tempDetails)
    localStorage.setItem("personDetail",JSON.stringify(this.personDetail))
  this.createForm()
  this.avatarSrc="http://placehold.it/180"
  console.log(this.personDetail)
  alert("submit success")
  this.router.navigate(['/records']);

}
else{
  alert("fill all fields")
}
}

update(){
  var recordPersons=localStorage.getItem('personDetail')
   
  this.personDetail=JSON.parse(recordPersons)
  var id=this.dataservice.personid;
  console.log(id)
  var tempDetails={}
  tempDetails=this.personDetailForm.value;
  tempDetails["id"]=id;
  tempDetails["avatar"]=this.avatarSrc
  console.log(this.personDetail)
  this.personDetail.records.splice(this.personDetail.records.indexOf(id), 1)
  this.personDetail.records.push(tempDetails)
  localStorage.setItem("personDetail",JSON.stringify(this.personDetail))
  
  this.updated.emit(true);






}




dataShow(id){
  if(localStorage.getItem('personDetail')!=null||localStorage.getItem('personDetail')!=undefined){
    var personInfo=JSON.parse(localStorage.getItem('personDetail'))
    personInfo.records.map(value=>{
      console.log(value)
      if(value.id==id){
        this.personDetailForm.controls['personName'].setValue(value.personName);
        this.personDetailForm.patchValue(value)
        this.avatarSrc=value.avatar
      }
    })

  }
}


  ngOnInit() {
    this.createForm()
  }
  

  

 

}
