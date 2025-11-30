import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-button',
  imports: [],
  templateUrl: './sort-button.html',
  styleUrl: './sort-button.css',
  standalone: true
})
export class SortButton {
  isOpen: boolean = false;
  sortType: Direction = Direction.byDateASC;

  Direction = Direction;
}

enum Direction {
  byDateASC,
  byDateDESC
}
