import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PersonaService } from '../persona.service';
import { isUndefined } from 'util';
import * as $ from 'jquery';
import { OptimizelyService } from '../optimizely.service';

@Component({
  selector: 'app-personaname',
  templateUrl: './personaname.component.html',
  styleUrls: ['./personaname.component.css']
})
export class PersonanameComponent implements OnInit, AfterViewInit {

  personaList;
  formSwitch = true;
  imageChoice = 1;
  predictedSetting;
  constructor( private personaService: PersonaService, public optimizelyService: OptimizelyService) {
  }
  ngOnInit() {
    this.getPredictedSetting();
  }

  ngAfterViewInit() {
 // subscribe to experiment and add create variations
    this.optimizelyService.getExperiment().subscribe(variation => {
      if (variation === 'variation_1') {
      // Code for Variation 1
      } else if (variation === 'variation_2') {
      // code for Variation 2
      }
      });
}


  goBack() {
    this.formSwitch = true;
  }

  getName() {
    return this.personaService.form.get('personaName').value;
  }

  getsetting(option) {
   if (option === 1 || option === '1') {
     return this.personaService.form.get('setting1').value;
   } else if (option === 2 || option === '2') {
     return this.personaService.form.get('setting2').value;
   } else if (option === 3 || option === '3') {
     return this.personaService.form.get('setting3').value;
  }
}

  jqueryForExplaination() {

        // Toggle plus minus icon on show hide of collapse element
        $(".fa").toggleClass("fa-plus");
        $(".fa").toggleClass("fa-minus");
  }

  onSubmit() {

    if (isUndefined(this.predictedSetting)) {
      this.personaService.form.patchValue({setting1: 0, setting2: 0, setting3: 0});
    } else {
      this.personaService.form.patchValue({setting1: this.predictedSetting[0].data.setting1,
        setting2: this.predictedSetting[0].data.setting2,
        setting3: this.predictedSetting[0].data.setting3});
        this.calculateAvg(0)
    }

    const data = this.personaService.form.value;
    this.personaService.createPersonaObject(data).then(res => {
      this.formSwitch = false;
    });
  }

  calculateAvg(option){
    var avg = (parseInt(this.personaService.form.get('setting1').value) +
      parseInt(this.personaService.form.get('setting2').value) +
        parseInt(this.personaService.form.get('setting3').value)) / 3;

    if (avg < 33) {
      this.imageChoice = 1;
      if (option === 0) {
        setTimeout(() => {
          $("#picBack1").addClass("imgBackground");
          $("#picBack2").removeClass("imgBackground");
          $("#picBack3").removeClass("imgBackground");
        }, 500);
      } else {
      $("#picBack1").addClass("imgBackground");
      $("#picBack2").removeClass("imgBackground");
      $("#picBack3").removeClass("imgBackground");
      }
    } else if (avg < 66) {
      this.imageChoice = 2;
      if (option === 0) {
        setTimeout(() => {
          $("#picBack1").removeClass("imgBackground");
          $("#picBack2").addClass("imgBackground");
          $("#picBack3").removeClass("imgBackground");
        }, 500);
      } else {
      $("#picBack1").removeClass("imgBackground");
      $("#picBack2").addClass("imgBackground");
      $("#picBack3").removeClass("imgBackground");
      }
    } else {
      this.imageChoice = 3;
      if (option === 0) {
        setTimeout(() => {
          $("#picBack1").removeClass("imgBackground");
          $("#picBack2").removeClass("imgBackground");
          $("#picBack3").addClass("imgBackground");
        }, 500);
      } else {
      $("#picBack1").removeClass("imgBackground");
      $("#picBack2").removeClass("imgBackground");
      $("#picBack3").addClass("imgBackground");
      }
    }
  }

  updatePersonaSetting(option, data) {
    var avg;
    if (option === 1 || option === '1') {
      this.personaService.form.patchValue({setting1: data});
    }
    if (option === 2 || option === '2') {
      this.personaService.form.patchValue({setting2: data});
    }
    if (option === 3 || option === '3') {
      this.personaService.form.patchValue({setting3: data});
    }
    this.personaService.updatePersonaObject(this.personaService.form.value);
    this.calculateAvg(1);
  }


  downLoadData() {
    this.getPersonaList();
  }

  getPredictedSetting() {
    this.personaService.getPredictedSetting().subscribe(actionArray => {
      this.predictedSetting = actionArray.map(item => {
        return {
          data: item.payload.doc.data()
        };
      });
      // console.log(this.predictedSetting);
    })
  }


  getPersonaList = () =>
  this.personaService.getPersonaObject().subscribe(actionArray => {
      this.personaList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        };
      });

      const rows = [];
      this.personaList.forEach(element => {
        rows.push([element.data.personaName, element.data.setting1, element.data.setting2, element.data.setting3]);
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + 'personaName,setting1,setting2,setting3' + '\n'
    + rows.map(e => e.join(',')).join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'datafortest.csv');
      document.body.appendChild(link); // Required for FF

      link.click();
    })

}
