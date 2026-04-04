import { Component, Input, signal } from '@angular/core';
import { CatalogType } from '../../../../types/catalog.type';
import { ShortTextPipe } from '../../../pipes/short-text-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'catalog-card',
  imports: [ShortTextPipe, RouterLink],
  templateUrl: './catalog-card.html',
  styleUrl: './catalog-card.scss',
})
export class CatalogCard {
  @Input() catalog: CatalogType;

  constructor() {
    this.catalog = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    };
  }
}
