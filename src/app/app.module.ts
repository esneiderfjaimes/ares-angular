import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire/compat';
import { envioment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoanComponent } from './components/loan/loan.component';
import { AmountPipe } from './utils/AmountPipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    UserComponent,
    LoanComponent,
    AmountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(envioment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(envioment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
