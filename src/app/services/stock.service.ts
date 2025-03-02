import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/IApiResponse.model';
import { IApiParams, IStock, IStockGlobalQuote } from '../models/stock.model';
import { Endpoints } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  getStocksData(params?: IApiParams): Observable<IApiResponse<IStock[]>> {
    return this.http.get<IApiResponse<IStock[]>>(Endpoints.fetch_stocks_data, {params})
  }

  fetchSingleStockData(params?: IApiParams):Observable<IStockGlobalQuote> {
    return this.http.get<IStockGlobalQuote>(Endpoints.fetch_stocks_data, {params})
  }

  fetchStockIntraDayData(params?: IApiParams){
    return this.http.get(Endpoints.fetch_stocks_data, {params})
  }

  
}
