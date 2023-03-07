import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KanbanBoardComponent } from './kanban-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [KanbanBoardComponent],
  imports: [CommonModule, DragDropModule,IonicModule],
  exports: [KanbanBoardComponent],
})
export class KanbanBoardModule {}
