import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Choice } from '../../models/choice';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.css',
  standalone: false,
})
export class PlaylistTableComponent {
  @Input() title: string = '';
  @Input() songs: Choice[] | null = [];
  @Input() showDeleteButton: boolean = false;
  @Output() delete = new EventEmitter<number>();

  get displayedColumns(): string[] {
    return this.showDeleteButton
      ? ['artist', 'song', 'actions']
      : ['artist', 'song'];
  }
  
  constructor(private store: Store) {}

  onDelete(index: number): void {
    this.delete.emit(index);
  }
}
