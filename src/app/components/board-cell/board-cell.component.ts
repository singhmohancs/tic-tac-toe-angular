import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * @ngdoc Component
 * @name boardCell
 * @description Component draw a board cell
 * Updates its value and state.
 * Update Player's Name X|O
 *
 * @export
 * @class BoardCellComponent
 * @implements {AfterViewInit}
 *
 * @author Mohan Singh <mslogicmaster@gmail.com>
 */
@Component({
  selector: 'board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss']
})
export class BoardCellComponent {
  /**
   * @ngdoc Input
   * @name cellIndex
   * holds the current index of the board-cell
   *
   * @type {number}
   * @memberof BoardCellComponent
   */
  @Input('cellIndex') cellIndex: number = 0;
  /**
   * @ngdoc Input
   * @name text A player name X | O
   * @type {string}
   * @memberof BoardCellComponent
   */
  @Input('text') text: string = '';
  /**
   * @ngdoc Input
   * @name canAttempt A boolean value that disable the cell when it is attempted
   *
   * @type {boolean}
   * @memberof BoardCellComponent
   */
  @Input('canAttempt') canAttempt: boolean = true;
  /**
   * @ngdoc Output
   * @name onCellClicked An Output binding that is trigged when a cell is clicked or attempted
   * this event is listened to by the parent component BoardComponent
   *
   * @type {EventEmitter<number>}
   * @memberof BoardCellComponent
   */
  @Output('onCellClicked') onCellClicked: EventEmitter<number> = new EventEmitter();

  /**
   * @ngdoc function
   * A click event handler
   *
   * @memberof BoardCellComponent
   */
  public handleClick(): void  {
    this.onCellClicked.emit(this.cellIndex);
  }
}
