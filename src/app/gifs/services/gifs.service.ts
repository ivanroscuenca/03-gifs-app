import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    //llamamos a cargar el loadLocalStorage en el contructor
    this.loadLocalStorage();
  }
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] = [];
  private apiKey: string = 'c9eEQXIdX7OlsdZ5ERbcUExdlAdEfklD';
  //creo lista vacía tipo Gif de la interface
  public gifList: Gif[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    //llamamos al metodo que guarda en localStorage
    this.saveLocalStorage();
  }

  //metodo para guardar informacion en localStorage( forma de replicar BBDD)
  //serializo con JSON.stringify
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    //deserializar con parse.operador ! para forzar que siempra va a hber un dato en history
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //mantener historial de imagen cuando recargo
    if (this._tagsHistory.length === 0) return;
    //se carga la primera de la lista es decir la última que elegimos
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    //tipo del get es generico <SearchResponse>
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
