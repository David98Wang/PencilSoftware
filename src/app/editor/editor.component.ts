import firebase, { User } from 'firebase';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editor: any;
  innerHTML: string;
  user: any;
  @ViewChild('editable', { static: true }) public media: ElementRef;
  initialContent: string;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log('hello there');
    firebase.auth().onAuthStateChanged((user: User) => {
      if (user) {
        this.user = user;
        console.log({ user });
        firebase.database().ref('/editor/' + this.user.uid).once('value').then((snap) => {
          console.log(snap.val());
          this.initialContent = snap.val().text;
          this.initEditor();
        });
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  initEditor() {
    this.editor = new MediumEditor(this.media.nativeElement, {
      toolbar: {
        buttons: ['bold', 'italic', 'quote', 'image'],
        diffLeft: 25,
        diffTop: 10,
      },
    });
    this.editor.subscribe('editableInput', (eventObj, editable) => {
      const text: string = editable.innerHTML;
      this.innerHTML = editable.innerHTML;
      const splitText = text.split('$');
      console.log(splitText.length);
      if (splitText.length % 2 === 1 && splitText.length >= 3) {
        const originalText = splitText[1];
        console.log(originalText);
        const url = "http://chart.apis.google.com/chart?cht=tx&chl=" + encodeURIComponent(originalText);
        const img = '<img src="' + url + '" alt="' + originalText + '"/>';
        const newText = text.replace('$' + originalText + '$', img);
        console.log(newText);
        this.editor.setContent(newText);
      }
      firebase.database().ref('editor/' + this.user.uid).set({
        text: text
      });
    });
    this.editor.setContent(this.initialContent);

  }

  async onLogout() {
    console.log("logging out");
    console.log(firebase.auth().tenantId);
    await firebase.auth().signOut();
    this.router.navigate(['login']);
  }
}
