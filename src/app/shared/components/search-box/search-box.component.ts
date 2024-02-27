import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit {
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
    this.debouncer.pipe(debounceTime(1000)).subscribe((value) => {
      this.OnEmitEvent.emit(value);
    });
  }
}
