import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/Country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activated: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activated.params
      .pipe(switchMap(({ id }) => this.countriesService.searchAlpha(id)))
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        this.country = country;
        return;
      });
  }
}
