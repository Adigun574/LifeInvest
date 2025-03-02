import { Component, Input } from '@angular/core';
import { IStock } from '../../models/stock.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {

  @Input({ transform: (value: any) => {
      if(value.symbol){
        return value
      }
      else{
        return {
          symbol: value['01. symbol'],
          timestamp: value['07. latest trading day'],
          open: value['02. open'],
          high: value['03. high'],
          low: value['04. low'],
          close: value['05. price'],
          volume: value['06. volume'],
          previous_close: value['08. previous close'],
          change: value['09. change'],
          change_percent: value['10. change percent'],
          extended_hours_quote: value[''],
          extended_hours_change: value[''],
          extended_hours_change_percent: value[''],
        }
      }
  } })
  public stock!: IStock;

  constructor(
    private router: Router
  ){

  }

  viewStock(_stock: IStock){
    this.router.navigate(['/stock/IBM'])
  }

}