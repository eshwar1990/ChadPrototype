import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as optimizely from '@optimizely/optimizely-sdk';

@Injectable({
  providedIn: 'root'
})
export class OptimizelyService {

  DATAFILE_URL = 'https://cdn.optimizely.com/datafiles/WuLDVTyuPG8XZ23CLts58.json';
  optimizelyInstance//: Observable<any>;

  constructor() { }

  // This method Fetches the Optimzely datafile from server and Instantiates an Optimizely client
 activateOptimizely(refresh?: boolean): Observable<any> {
   if (this.optimizelyInstance && !refresh) {
     return this.optimizelyInstance;
   }

   return Observable.fromPromise(fetch(this.DATAFILE_URL)
     .then(res => res.json())
     .then(datafile => this.optimizelyInstance = optimizely.createInstance({ datafile }))
   );
 }

 // This returns an Observable of the value of the Experiment that we activate
 getExperiment(): Observable<string> {
   return this.activateOptimizely()
     .map(oi => oi.activate('personasetting_test', 'eshwar1990@gmail.com'))
     .first();
 }


}
