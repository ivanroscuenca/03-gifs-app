import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //importamos gifService
  constructor(private gifsService: GifsService) {}
  //getter
  public get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
