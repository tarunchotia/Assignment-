import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { RouterModule,Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { PersonListComponent } from './person-list/person-list.component';
import { AgePipe } from './age.pipe';


const Routes:Routes=[
  {
    path:'',
    component:ConfigComponent
  },
  {
    path:'records',
    component:PersonListComponent
  },

  // {
  //   path:"dashboard",
  //   component:DashboardComponent
  // }


]
@NgModule({
  declarations: [
    AppComponent,
  
    ConfigComponent,
  
    CardComponent,
  
    PersonListComponent,
  
    AgePipe,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
