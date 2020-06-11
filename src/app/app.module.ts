import {
    AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule
} from 'angularx-social-login';
import firebase from 'firebase';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import LoginComponent from './login/login.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '747886451919-37kp2vckqjfeqm6nnnush3ghtcdq996n.apps.googleusercontent.com'
    ),
  },
]);

export function provideConfig() {
  return config;
}
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent, LoginComponent, EditorComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    SocialLoginModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
