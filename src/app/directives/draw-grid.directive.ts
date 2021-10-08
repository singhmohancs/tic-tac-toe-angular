import { Directive, AfterViewInit } from '@angular/core';
/**
 * @ngdoc Directive
 * @name ticDrawGrid
 * @description Directive to draw the grid on board
 *
 * @export
 * @class DrawGridDirective
 * @implements {AfterViewInit}
 *
 * @author Mohan Singh <mslogicmaster@gmail.com>
 */
@Directive({
  selector: '[ticDrawGrid]'
})
export class DrawGridDirective implements AfterViewInit {

  /**
   * @ngdoc hook
   * Implementation ngAfterViewInit hook
   *
   * @memberof DrawGridDirective
   */
  ngAfterViewInit() {
    this.drawGrid();
  }
  /**
   * @ngdoc function
   *
   * draw grid on board
   *
   * @private
   * @memberof DrawGridDirective
   */
  private drawGrid(): void {
    let cells  = document.querySelectorAll<HTMLElement>('.board-cell');
    cells.forEach((box: HTMLElement, i) => {
      let styleString = '';
      if (i < 3) {
        styleString += 'border-bottom: 3px solid #ccc;';
      }
      if (i % 3 === 0) {
        styleString += 'border-right: 3px solid #ccc;';
      }
      if (i % 3 === 2) {
        styleString += 'border-left: 3px solid #ccc;';
      }
      if (i > 5) {
        styleString += 'border-top: 3px solid #ccc;';
      }
      box.setAttribute('style', styleString);
    });
  }
}
