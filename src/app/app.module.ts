import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { initializeApp } from 'firebase/app';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


export const firebaseConfig = {
  apiKey: "AIzaSyB4irP2UEzZETuh3FZHDzDAwBDYOJPc4pw",
  authDomain: "isus-recycler.firebaseapp.com",
  projectId: "isus-recycler",
  storageBucket: "isus-recycler.appspot.com",
  messagingSenderId: "263199855406",
  appId: "1:263199855406:web:3e1139af5ea29c546560bf",
  measurementId: "G-2285LQC9ZT"
};

initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({ mode: 'md' }), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
