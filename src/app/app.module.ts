import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardCellComponent } from './components/board-cell/board-cell.component';
import { BoardComponent } from './components/board/board.component';
import { DrawGridDirective } from './directives/draw-grid.directive';

@NgModule({
  declarations: [
    AppComponent,
    DrawGridDirective,
    BoardComponent,
    BoardCellComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
