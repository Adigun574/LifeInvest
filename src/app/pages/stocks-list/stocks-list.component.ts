import { Component, DestroyRef, inject } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { IApiParams, IStock, IStockGlobalQuote } from '../../models/stock.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe, Subject, takeUntil } from 'rxjs';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UpperCasePipe } from '@angular/common';
import { StockCardComponent } from '../../components/stock-card/stock-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { IApiResponse } from '../../models/IApiResponse.model';

@Component({
  selector: 'app-stocks-list',
  standalone: true,
  imports: [StockCardComponent, ReactiveFormsModule, StockDetailsComponent, LoaderComponent, SpinnerComponent, ToastrModule],
  templateUrl: './stocks-list.component.html',
  styleUrl: './stocks-list.component.scss',
  providers: [ToastrService, UpperCasePipe]
})
export class StocksListComponent {

  stocks:IStock[] = [];
  stocksList:IStock[] = [];
  destroyRef = inject(DestroyRef);
  searchForm!: FormGroup;
  loading!: boolean;
  searching!: boolean;
  apiQueryParams: IApiParams = {
    function: 'REALTIME_BULK_QUOTES', 
    symbol:'MSFT,AAPL,IBM'
  }
  private destroy$ = new Subject<void>();

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private upperCase: UpperCasePipe
  ){

  }

  ngOnInit(){
    this.initForm();
    this.fetchData(this.apiQueryParams);
    this.observeSearchField()
  }

  initForm(){
    this.searchForm = this.fb.group({
      searchKey: ['']
    })
  }

  get searchFormData(){
    return this.searchForm.controls
  }

  observeSearchField(){
    this.searchFormData['searchKey'].valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if(!data){
        this.stocks = [...this.stocksList]
      }
    })
  }

  search(){
    const symbol: string = this.searchFormData['searchKey'].value
    if(symbol){
      this.searching = true
        this.stockService.fetchSingleStockData({function: 'GLOBAL_QUOTE', symbol})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: (response: Partial<IStockGlobalQuote>) => {
          if(response['Global Quote'] && response['Global Quote']['01. symbol']){
            this.stocks = [{...response['Global Quote']}] as unknown as IStock[]
          }
          else{
            this.toastr.error(`No stock found with the symbol ${this.upperCase.transform(symbol)}`);
          }
          this.searching = false
        },
        error: (err) => {
          this.searching = false
          this.toastr.error(`No stock found with the symbol ${this.upperCase.transform(symbol)}`);
        }
      })
    }
    else{
      this.stocks = [...this.stocksList]
    }
  }

  fetchData(params: IApiParams){
    this.loading = true
    this.stockService.getStocksData(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: IApiResponse<IStock[]>) => {
        this.stocksList = [...response.data]
        this.stocks = [...response.data]
        this.loading = false
      },
      error: (err) => {
        this.loading = false
      }
    })
  }

}
