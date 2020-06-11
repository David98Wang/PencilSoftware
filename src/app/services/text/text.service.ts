import firebase from 'firebase';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor() { }

  updateText(ref: string, text: string) {
    const updates = {};
    updates[ref + '/text'] = text;
    return firebase.database().ref().update(updates);
  }

}
