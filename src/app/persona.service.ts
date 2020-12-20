import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(   private firestore: AngularFirestore   ) {}
                                
   form = new FormGroup({
        personaName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        setting1: new FormControl(''),
        setting2: new FormControl(''),
        setting3: new FormControl('')
    });

  createPersonaObject(data) {

    return new Promise<any>((resolve, reject) => {
        this.firestore
            .collection('personaObject')
            .doc(data.personaName)
            .set(data);
        resolve(1);
    });
  }

  getPredictedSetting() {
    return this.firestore.collection('predictedSetting').snapshotChanges();
  }

  getPersonaObject() {
    return this.firestore.collection('personaObject', (ref) => ref.limit(100)).snapshotChanges();
  }

  updatePersonaObject(data) {
    return this.firestore.collection('personaObject')
      .doc(data.personaName)
      .set(data, {merge: true});
  }
}
