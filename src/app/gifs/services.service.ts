import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    this._tagsHistory.unshift(tag);
  }

  constructor() {}
}

// En el código proporcionado, [...this._tagsHistory] crea una copia superficial
//(shallow copy) del arreglo _tagsHistory. La sintaxis ... se conoce como el
//operador de propagación (spread operator) en JavaScript y permite copiar los
//elementos de un arreglo (u otro tipo de objeto iterable) en un nuevo arreglo.

// En términos prácticos, al hacer [...this._tagsHistory], se crea un nuevo arreglo
// que contiene los mismos elementos que el arreglo _tagsHistory,
//pero es una entidad separada en la memoria. Esto es útil para evitar que cambios
// realizados en la copia afecten al arreglo original y viceversa.
