import { Component } from '@angular/core';
import { Country } from '../../interfaces/Country.interface';
import { CountriesService } from '../../services/countries.service.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  public isLoading: boolean = false;
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByCountry(country: string) {
    this.isLoading = true;
    this.countriesService.searchCountry(country).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
