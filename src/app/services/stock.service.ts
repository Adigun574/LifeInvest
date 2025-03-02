import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/IApiResponse.model';
import { IStock } from '../models/stock.model';
import { Endpoints } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  getStocksData(params?: any): Observable<IApiResponse<IStock>> {
    return this.http.get<IApiResponse<IStock>>(Endpoints.fetch_stocks_data, {params})
  }

  fetchIntraDayData(params?: any){
    return this.http.get(Endpoints.fetch_stocks_data, {params})
  }

  fetchSingleStockData(params?: any){
    return this.http.get(Endpoints.fetch_stocks_data, {params})
  }
  
}
