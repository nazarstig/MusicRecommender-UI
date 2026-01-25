import { Component, Input } from '@angular/core';
import { Choice } from '../../models/choice';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.css',
  standalone: false,
})
export class PlaylistTableComponent {
  displayedColumns: string[] = ['artist', 'song'];
  @Input() title: string = '';
  @Input() songs: Choice[] | null = [];
}
