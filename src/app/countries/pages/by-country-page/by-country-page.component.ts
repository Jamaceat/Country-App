import { Component } from '@angular/core';
import { Country } from '../../interfaces/Country.interface';
import { CountriesService } from '../../services/countries.service.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByCountry(country: string) {
    this.countriesService
      .searchCountry(country)
      .subscribe((countries) => (this.countries = countries));
  }
}
