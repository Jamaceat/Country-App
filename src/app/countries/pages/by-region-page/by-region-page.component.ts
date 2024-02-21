import { Component } from '@angular/core';
import { Country } from '../../interfaces/Country.interface';
import { CountriesService } from '../../services/countries.service.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByRegion(region: string) {
    this.countriesService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
