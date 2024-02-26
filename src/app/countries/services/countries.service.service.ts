import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/Country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  searchAlpha(query: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiURl}/alpha/${query}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiURl}/capital/${query}`)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiURl}/name/${query}`)
      .pipe(catchError((countries) => of([])));
  }

  searchRegion(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiURl}/region/${query}`)
      .pipe(catchError((countries) => of([])));
  }
}
