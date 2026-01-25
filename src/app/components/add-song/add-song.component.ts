import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddSongToPlaylist } from '../../store/main.actions';
import { MainService } from '../../services/main.service';
import { Artist } from '../../models/artist';
import { Choice } from '../../models/choice';
import { Song } from '../../models/song';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css',
  standalone: false,
})
export class AddSongComponent {
  artistControl = new FormControl('');
  songControl = new FormControl('');
  choices: Choice[] = [];
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;
  songs: Song[] = [];
  selectedSong: Song | null = null;

  filteredArtists!: Observable<Artist[]>;
  filteredSongs!: Observable<Song[]>;

  constructor(
    private cdr: ChangeDetectorRef, 
    private store: Store,
    private mainService: MainService ) { }

  ngOnInit() {
    this.filteredArtists = this.artistControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterArtists(value || '', this.artists))
    );

    this.filteredSongs = this.songControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSongs(value || '', this.songs))
    );

    this.getArtists();
  }

  addSongToPreferences() {
    const artist = this.selectedArtist;
    const song = this.selectedSong;
    if (!artist || !song) {
      return;
    }
    let choice: Choice = { ArtistName: artist.ArtistName, ArtistId: artist.ArtistId, 
      TrackId: song.TrackId, TrackName: song.TrackName };
    this.store.dispatch(new AddSongToPlaylist(choice));
    this.artistControl.setValue('');
    this.songControl.setValue('');
    this.cdr.detectChanges();
  }

  showPreferences() {
    console.log(this.choices);
  }

  displayArtist(value: Artist): string {
    return value ? value.ArtistName : '';
  }

  displaySong(value: Song): string {
    return value ? value.TrackName : '';
  }

  getArtists(): any {
    this.mainService.getArtists().subscribe((artists: any) => {
      this.artists = artists;
      this.artistControl.setValue('');
    });
  }

  getSongsByArtist(artistId: string): any {
    this.mainService.getSongsByArtist(artistId).subscribe((songs: any) => {
      this.songs = songs;
      this.songControl.setValue('');
      console.log(JSON.stringify(songs));
    });
  }

  artistSelectHandler(selectedOption: Artist): void {
    this.selectedArtist = selectedOption;
    this.getSongsByArtist(this.selectedArtist.ArtistId);
  }

  songSelectHandler(selectedOption: Song): void {
    this.selectedSong = selectedOption;
  }

  private filterArtists(value: string | Artist, options: Artist[]): Artist[] {
    let filterValue: string;
    if (typeof value === 'string') {    
      filterValue = value.toLowerCase();
    }
    else if (value as Artist) {
      filterValue = value.ArtistName.toLowerCase();
    }
    return options.filter(option => option.ArtistName.toLowerCase().includes(filterValue));
  }

  private filterSongs(value: string | Song, options: Song[]): Song[] {
    let filterValue: string;
    if (typeof value === 'string') {    
      filterValue = value.toLowerCase();
    }
    else if (value as Song) {
      filterValue = value.TrackName.toLowerCase();
    }
    return options.filter(option => option.TrackName.toLowerCase().includes(filterValue));
  }
}
