import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  aAnimales:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {
    this.aAnimales = ANIMALES.slice(0); //slice(0): crea una copia de los datos
  }

  fnReproducir( oAnimal:Animal ){
    console.log(oAnimal);
    //Pausar los demas animales
    this.fnPausarAudios(oAnimal);

    if(oAnimal.reproduciendo){
      oAnimal.reproduciendo = false;
      return;
    }

    //Referencia, Carga y Reproduce el Audio
    this.audio.src = oAnimal.audio;
    this.audio.load();
    this.audio.play();
    //Indica que el audio se esta reproduciendo
    oAnimal.reproduciendo = true;
    //Indica 
    this.audioTiempo = setTimeout( ()=> oAnimal.reproduciendo = false, oAnimal.duracion * 1000 );
  }

  private fnPausarAudios(oAnimalActual:Animal){
    //Inicializar el TimeOut
    clearTimeout(this.audioTiempo);
    //Pausar el Audio
    this.audio.pause();
    this.audio.currentTime = 0; //Inicia el Audio
    
    //Pausar todos los animales excepto el actual
    for(let animal of this.aAnimales){
      if(animal.nombre != oAnimalActual.nombre){
        animal.reproduciendo = false;
      }
    }
  }

  fnBorrar(index:number){
    //Borrar desde la posición index, solo un registro
    this.aAnimales.splice(index,1);
  }

  fnRefresh(eRefresher:Refresher){
    
    setTimeout(() => {
      console.log('Async operation has ended');
      this.aAnimales = ANIMALES.slice(0); //slice(0): crea una copia de los datos
      eRefresher.complete();
    }, 1000);
  }

  fnOrdenarLista(eIndex:any){
    console.log(eIndex);
    this.aAnimales = reorderArray(this.aAnimales, eIndex);
  }

}
