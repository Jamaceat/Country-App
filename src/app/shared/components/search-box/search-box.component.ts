import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Output()
  OnEnterEvent: EventEmitter<string> = new EventEmitter();

  public onEnterPress(value: string): void {
    console.log('evento enter');

    this.OnEnterEvent.emit(value);
  }

  @Input()
  public placeholder: string = '';
}
