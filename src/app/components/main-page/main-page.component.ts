import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainState } from '../../store/main.state';
import { Observable } from 'rxjs';
import { Choice } from '../../models/choice';
import { Select, Store } from '@ngxs/store';
import { ClearPlaylist, GetRecommendations, RemoveSongFromPlaylist } from '../../store/main.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  standalone: false,
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPageComponent implements OnInit {
  @Select(MainState.getPlaylistSongs) choices$!: Observable<Choice[]>;
  @Select(MainState.getRecommendations) recommendations$!: Observable<Choice[]>;
  @Select(MainState.getIsLoading) isLoading$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit() { }

  getRecommendations() {
    const playlistSongs = this.store.selectSnapshot(MainState.getPlaylistSongs);
    const trackIds = playlistSongs.map(song => song.TrackId);
    this.store.dispatch(new GetRecommendations(trackIds));
  }

  clearPlaylist() {
    this.store.dispatch(new ClearPlaylist());
  }

  removeSongFromPlaylist(index: number) {
    this.store.dispatch(new RemoveSongFromPlaylist(index));
  }
}
