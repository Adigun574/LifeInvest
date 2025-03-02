import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes(environment.alphaVantageBaseUrl)){
    const modifiedReq = req.clone({
      setParams: {
        apikey: environment.alphaVantageApiKey
      },
    });
    return next(modifiedReq);
  }

  return next(req)
};
