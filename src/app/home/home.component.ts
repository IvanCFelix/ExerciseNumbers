import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ListService } from '@app/services/list.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string = '';
  numberValue: number = 0;
  arrayNumbers: Array<any> = [];
  constructor(private _listServices: ListService) {}

  ngOnInit() {}
  showData = () => {
    //Primero se limpia el array para que no se ensimen resultados
    this.arrayNumbers = [];
    //Se recorrer un for las veces del numero ingresado
    for (let i = 0; i <= this.numberValue; i++) {
      if (i > 0 && i % 3 === 0) {
        //Se evalua que la division entre 3 de como residuo 0 y se hace un push al array
        this.arrayNumbers.push({ number: i, color: '#67E107' });
      } else if (i > 0 && i % 5 === 0) {
        this.arrayNumbers.push({ number: i, color: '#E10707' });
      } else if (i > 0 && i % 7 === 0) {
        //Se hace la misma comparacion que la anterior pero con los colores del 5
        this.arrayNumbers.push({ number: i, color: '#07BDE1' });
      }
    }

    const objData = { userNamer: this.userName, list: this.arrayNumbers };
    this._listServices
      .saveData(objData)
      .then(() => {
        alert('Se a hecho el registro');
      })
      .catch((error) => console.error(error));
  };
}
