import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service.service';
import { Country } from '../../interfaces/Country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countryService: CountriesService) {}

  SearchByCapital(term: string): void {
    this.isLoading = true;
    console.log('Desde ByCapitalPage');
    console.log({ term });
    this.countryService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }
}
