import {
    AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser
} from 'angularx-social-login';
import firebase from 'firebase';
import { HtmlGenerator, parse } from 'latex.js';
import MediumEditor from 'medium-editor';
import { EventEmitter } from 'protractor';

import {
    Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  loggedIn: boolean;
  innerHTML: string;
  constructor(private router: Router) { }
  database: any;

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/editor']);
      }
    }
    );
  }

  onLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log({ result });
      console.log(result.additionalUserInfo.profile);
      this.router.navigate(['/editor']);
    });
  }
}