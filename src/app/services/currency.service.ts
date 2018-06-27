import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class CurrencyService {
  private exchangeServiceUrl = environment.EXCHANGE_URL;
  private exchangeApiKey = environment.EXCHANGE_KEY;

  constructor(private http: HttpClient) { }
  public fetchExchangeRates(base, target): Observable<any>  {

    const headers = new HttpHeaders()
           .set('Content-Type', 'application/json; charset=utf-8')
    const url = this.exchangeServiceUrl + '?from=' + base + '&to=' + target + '&quantity=1&api_key='+this.exchangeApiKey;
    return this.http.get<any>(url,{headers: headers}).map(data => data);
  }
}
