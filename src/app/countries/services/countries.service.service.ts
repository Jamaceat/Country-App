import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/Country.interface';
import { CacheStore } from '../interfaces/Cache-store.interface';
import { Region } from '../interfaces/Region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: { term: '', countries: [] },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => of([])),
      delay(2000)
    );
  }

  searchAlpha(query: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiURl}/alpha/${query}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiURl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, countries };
      })
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiURl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiURl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }
}
