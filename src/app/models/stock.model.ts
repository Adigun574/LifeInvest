export interface IStock {
    symbol: string;
    timestamp: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    previous_close: string;
    change: string;
    change_percent: string;
    extended_hours_quote: string;
    extended_hours_change: string;
    extended_hours_change_percent: string;
}

export interface IApiParams {
    [key: string]: string | number | boolean | readonly (string | number | boolean)[];
}

export interface IStockGlobalQuote {
    "Global Quote": {
        "01. symbol": string;
        "02. open": string;
        "03. high": string;
        "04. low": string;
        "05. price": string;
        "06. volume": string;
        "07. latest trading day": string;
        "08. previous close": string;
        "09. change": string;
        "10. change percent": string;
    }
}

export interface IStockTimeSeries {
    [key: string]: {
        [key: string]: {
            "1. open": string;
            "2. high": string;
            "3. low": string;
            "4. close": string;
            "5. volume": string;
        }
    };
}