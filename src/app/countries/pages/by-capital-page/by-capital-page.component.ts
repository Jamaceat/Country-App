import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service.service';
import { Country } from '../../interfaces/Country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  constructor(private countryService: CountriesService) {}

  public countries: Country[] = [];

  SearchByCapital(term: string): void {
    console.log('Desde ByCapitalPage');
    console.log({ term });
    this.countryService
      .searchCapital(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
