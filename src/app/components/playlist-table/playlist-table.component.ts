import { Component, Input } from '@angular/core';
import { SongInfo } from '../../models/song-info';
import { Select } from '@ngxs/store';
import { MainState } from '../../store/main.state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.css',
  standalone: false,
})
export class PlaylistTableComponent {
  @Select(MainState.getPlaylistSongs) choices$!: Observable<SongInfo[]>;
  //@Input() choices: SongInfo[] = [];
}
