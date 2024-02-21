import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Output()
  OnEnterEvent: EventEmitter<string> = new EventEmitter();

  public onEnterPress(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter') {
      console.log('evento ' + event.key);

      this.OnEnterEvent.emit(value);
    }
  }

  @Input()
  public placeholder: string = '';
}
