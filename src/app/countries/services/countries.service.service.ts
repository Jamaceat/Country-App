import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/Country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchAlpha(query: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiURl}/alpha/${query}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url: string = `${this.apiURl}/capital/${query}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]> {
    const url: string = `${this.apiURl}/name/${query}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(query: string): Observable<Country[]> {
    const url: string = `${this.apiURl}/region/${query}`;
    return this.getCountriesRequest(url);
  }
}
