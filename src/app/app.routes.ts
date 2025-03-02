import { Routes } from '@angular/router';
import { StocksListComponent } from './pages/stocks-list/stocks-list.component';
import { StockDetailsComponent } from './pages/stock-details/stock-details.component';

export const routes: Routes = [
    {
        path: '',
        component: StocksListComponent
    },
    {
        path: 'stock/:symbol',
        component: StockDetailsComponent
    }
];
