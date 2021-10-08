import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { Attempt } from '../../models/attempt';
/**
 * @ngdoc Component
 * @name board
 * @description this componentis reposible to draw board and attach behaviour and properties to it
 * Draw board and cells
 * Handle attempts
 *
 * @export
 * @class BoardComponent
 * @implements {AfterViewInit}
 *
 * @author Mohan Singh <mslogicmaster@gmail.com>
 */
@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {
  /**
   * A NodeList of type BoardCellComponent
   */
  @ViewChildren(BoardCellComponent) private squares!: QueryList<BoardCellComponent>;
  /**
   * stores player's attempts
   *
   * @type {Attempt[]}
   * @memberof BoardComponent
   */
  attempts: Attempt[] = [];
  /**
   * stores activePlayer O | X
   *
   * @type {string}
   * @memberof BoardComponent
   */
  activePlayer: string = localStorage.getItem('activePlayer') || 'X';
  /**
   * stores a boolean value.
   * isWon = true if any player wins game else false
   *
   * @type {boolean}
   * @memberof BoardComponent
   */
  isWon: boolean = false;
  /**
   * stores a boolean value.
   * isDraw = true if all player complete their attempts and none of them win
   * @type {boolean}
   * @memberof BoardComponent
   */
  isDraw: boolean = false;
  /**
   * stores a associate array of cell indexes.
   * each item of an array represents winning combination.
   *
   * @memberof BoardComponent
   */
  winMatrix: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  /**
   *Creates an instance of BoardComponent.
   * @param {ChangeDetectorRef} cdf
   * @memberof BoardComponent
   */
  constructor(private cdf: ChangeDetectorRef) { }

  /**
   * implements lifecycle hook AfterViewInit {}
   *
   * @memberof BoardComponent
   */
  ngAfterViewInit() {
    let attempts = this.getAttempts();
    this.attempts = attempts;
    for (let i = 0; i < attempts.length; i++) {
      const square = this.getSquare(attempts[i].cellIndex);
      if (square)
        square.text = attempts[i].player;
    }
    this.cdf.detectChanges();
  }

  /**
   * An helper function that returns an array of steps from previous attempts
   * This is used to persits the state of game.
   * Why ? User can reload page accidently
   *
   * @private
   * @returns {Attempt[]}
   * @memberof BoardComponent
   */
  private getAttempts(): Attempt[] {
    const attempts: Attempt[] = [];
    const playerAttempts = localStorage.getItem('playerAttempts');
    if (playerAttempts) {
      const h: Attempt[] = JSON.parse(playerAttempts) || [];
      for (let i = 0; i < h.length; i++) {
        attempts.push(h[i]);
      }
    }
    return attempts;
  }

  /**
   * Cell click handler / player attempts handler
   * Checks number of attempts
   * Check if game is finished with win/draw
   * Stores players attempts in localStorage for future use.
   * Stores activePlayer in localStorage for future use.
   * Set active player.
   *
   * @param {number} cellIndex
   * @memberof BoardComponent
   */
  public handleCellClick(cellIndex: number): void {
    const square = this.getSquare(cellIndex);
    if (square) {
      this.attempts.push({
        player: this.activePlayer,
        cellIndex: square.cellIndex
      });
      square.text = this.activePlayer;
      square.canAttempt = false;
      localStorage.setItem('playerAttempts', JSON.stringify(this.attempts));
    }
    if (this.hasActivePlayerWon()) {
      this.isWon = true;
      this.disableAttempts();
    } else if (this.hasAllAttempted()) {
      this.isDraw = true;
    } else {
      this.activePlayer = (this.activePlayer === 'X') ? 'O' : 'X';
    }
    localStorage.setItem('activePlayer', this.activePlayer);
  }

  /**
   * An helper function that reset the state of Game to initial
   *
   * @memberof BoardComponent
   */
  public reset(): void {
    this.isWon = false;
    this.isDraw = false;
    this.activePlayer = 'X';
    this.attempts = [];
    this.squares.forEach((square) => {
      square.text = '';
      square.canAttempt = true;
    })
    localStorage.removeItem('playerAttempts');
    localStorage.removeItem('activePlayer');
  }

  /**
   * an helper function to get current cell that is attempted
   *
   * @private
   * @param {number} cellIndex
   * @returns {(BoardCellComponent | undefined)}
   * @memberof BoardComponent
   */
  private getSquare(cellIndex: number): BoardCellComponent | undefined {
    return this.squares.find((square) => square.cellIndex == cellIndex);
  }
  /**
   * an helper function to check if current player has won
   * get active player and check its winning combinations
   *
   * @private
   * @returns {boolean}
   * @memberof BoardComponent
   */
  private hasActivePlayerWon(): boolean {
    const activePlayerAttempts = this.attempts.filter((attempt) => attempt.player === this.activePlayer);

    for (let i = 0; i < this.winMatrix.length; i++) {
      const [a, b, c] = this.winMatrix[i];
      const matchingAttempts = activePlayerAttempts.filter((move) =>
        move.cellIndex === a ||
        move.cellIndex === b ||
        move.cellIndex === c);
      if (matchingAttempts.length === 3) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if both players completed their attempts
   *
   * @private
   * @returns {boolean}
   * @memberof BoardComponent
   */
  private hasAllAttempted(): boolean {
    return this.attempts.length === 9;
  }

  /**
   * Don't allow player to attempt.
   *
   * @private
   * @memberof BoardComponent
   */
  private disableAttempts() {
    this.squares.forEach((square) => {
      square.canAttempt = false;
    });
  }
}
