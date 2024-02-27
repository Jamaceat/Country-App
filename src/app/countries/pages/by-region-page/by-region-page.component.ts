import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country.interface';
import { CountriesService } from '../../services/countries.service.service';
import { Region } from '../../interfaces/Region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  public isLoading: boolean = false;
  public selectedRegion?: Region;
  public countries: Country[] = [];

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  searchByRegion(region: Region) {
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }
}
