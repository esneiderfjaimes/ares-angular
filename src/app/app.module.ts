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
import { AmountPipe } from './utils/amount.pipe';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { LoanPage } from './pages/loan/loan.page';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TrendModule } from 'ngx-trend';
// animations module required for autoDraw
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    UserComponent,
    LoanComponent,
    LoanPage,
    TransactionComponent,
    AmountPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    TrendModule,
    NgxChartsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(envioment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(envioment.firebase),
    provideFirebaseApp(() => initializeApp({"projectId":"ares-by-nei","appId":"1:1014252413822:web:46869a991e0a2843c0c92f","storageBucket":"ares-by-nei.appspot.com","apiKey":"AIzaSyCmWB7Y7VLzNLOOki1pr5w_yxeBoQOsQJI","authDomain":"ares-by-nei.firebaseapp.com","messagingSenderId":"1014252413822","measurementId":"G-43CC2G3J93"})),
    provideAnalytics(() => getAnalytics()),
  ],
  providers: [
    ScreenTrackingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
