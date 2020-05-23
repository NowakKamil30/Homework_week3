import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Output() CarIdEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event): void {
    this.CarIdEmitter.emit(event.target.value);
  }

}
