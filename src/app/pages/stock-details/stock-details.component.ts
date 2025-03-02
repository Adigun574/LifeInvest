import { Component, ViewChild } from '@angular/core';
import { StockService } from '../../services/stock.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { IApiParams, IStock } from '../../models/stock.model';
import { IBMMockData } from '../../data/stock.data';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IApiResponse } from '../../models/IApiResponse.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [NgApexchartsModule, LoaderComponent],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss'
})
export class StockDetailsComponent {

  @ViewChild("chart") chart!: ChartComponent;
  // public chartOptions!: Partial<ChartOptions>;
  public chartOptions: any;
  symbol!: string;
  loading!: boolean;
  stocks!: IStock[];
  private destroy$ = new Subject<void>();

  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }
  ngOnInit() {
    this.getRouteData()
    this.fetchStocks({function: 'REALTIME_BULK_QUOTES', symbol:'MSFT,AAPL,IBM', apikey: 'demo'})
  }

  getRouteData(){
    this.route.params.subscribe({
      next: (params) => {
        this.symbol = params['symbol']
        this.fetchStockData(this.symbol)
      }
    })
  }

  fetchStocks(params: IApiParams){
    this.stockService.getStocksData(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: IApiResponse<IStock[]>) => {
        this.stocks = [...response.data]
      },
      error: (err) => {
      }
    })
  }

  fetchStockData(symbol: string){
    this.loading =  true
    this.stockService.fetchStockIntraDayData({symbol})
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response:any) => {
        // FETCH MOCK DATA FROM THE THE MOCK DATA FILE IF THE REUQEST FAILS TO DUE TO API PRICING RESTRICTIONS
        if(response['Time Series (5min)']){
          let timeStamps = Object.keys(response['Time Series (5min)']).splice(0,5)
          let values = Object.values(response['Time Series (5min)']).splice(0,5).map((value:any) => value['2. high'])
          this.setGraphData(timeStamps, values)
        }
        // FETCH MOCK DATA FROM THE THE MOCK DATA FILE IF THE REUQEST FAILS TO DUE TO API PRICING RESTRICTIONS
        else{
          response = {...IBMMockData}
          let timeStamps = Object.keys(response['Time Series (5min)']).splice(0,5)
          let values = Object.values(response['Time Series (5min)']).splice(0,5).map((value:any) => value['2. high'])
          this.setGraphData(timeStamps, values)
        }
        this.loading = false
      },
      error: (err) => {
        this.loading = false
      }
    })
  }

  setGraphData(timeStamps: string[], values: string[]){
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [...values]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Stock Price",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          ...timeStamps
        ]
      }
    };
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
