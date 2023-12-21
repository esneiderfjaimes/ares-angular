import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire/compat';
import { envioment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ares-by-nei","appId":"1:1014252413822:web:46869a991e0a2843c0c92f","storageBucket":"ares-by-nei.appspot.com","apiKey":"AIzaSyCmWB7Y7VLzNLOOki1pr5w_yxeBoQOsQJI","authDomain":"ares-by-nei.firebaseapp.com","messagingSenderId":"1014252413822","measurementId":"G-43CC2G3J93"})),
    provideAuth(() => getAuth()),

    AngularFireModule.initializeApp(envioment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
