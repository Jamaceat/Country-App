import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncerSuscription?: Subscription;

  @Output()
  OnEnterEvent: EventEmitter<string> = new EventEmitter();

  @Output()
  OnEmitEvent: EventEmitter<string> = new EventEmitter();

  private debouncer: Subject<string> = new Subject();

  @Input()
  public placeholder: string = '';

  public onEnterPress(value: string): void {
    console.log('evento enter');

    this.OnEnterEvent.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.OnEmitEvent.emit(value);
      });
  }

  ngOnDestroy(): void {
    console.log('Destruido');

    this.debouncerSuscription?.unsubscribe();
  }
}
