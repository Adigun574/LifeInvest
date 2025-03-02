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
    function?: string; 
    symbol?: string; 
    apikey?: string;
}