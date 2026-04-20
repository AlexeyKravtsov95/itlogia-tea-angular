import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogType } from '../../types/catalog.type';
import { environment } from '../../../environments/environment';

@Injectable()
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalog(): Observable<CatalogType[]> {
    return this.http.get<CatalogType[]>(environment.apiUrl + 'tea');
  }

  getProduct(id: number): Observable<CatalogType> {
    return this.http.get<CatalogType>(environment.apiUrl + `tea?id=${id}`);
  }

  createOrder(data: {
    name: string;
    last_name: string;
    phone: string;
    country: string;
    zip: string;
    product: string;
    address: string;
    comment?: string;
  }) {
    return this.http.post<{ success: number }>(
      environment.apiUrl + 'order-tea',
      data,
    );
  }
}
