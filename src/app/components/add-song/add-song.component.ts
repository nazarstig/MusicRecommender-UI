import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { SongInfo } from '../../models/song-info';
import { Store } from '@ngxs/store';
import { AddSongToPlaylist } from '../../store/main.actions';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css',
  standalone: false,
})
export class AddSongComponent {
  preferenceForm: FormGroup = new FormGroup({});

  artistControl = new FormControl('');
  songControl = new FormControl('');

  choices: SongInfo[] = [];

  artists: string[] = [];
  //   'The Beatles',
  //   'Queen',
  //   'Led Zeppelin',
  //   'Pink Floyd',
  //   'The Rolling Stones',
  //   'Nirvana',
  //   'Radiohead',
  //   'Arctic Monkeys',
  //   'The Strokes',
  //   'Red Hot Chili Peppers'
  // ];

  songs: string[] = [];
  //   'Bohemian Rhapsody',
  //   'Stairway to Heaven',
  //   'Hotel California',
  //   'Smells Like Teen Spirit',
  //   'Imagine',
  //   'Hey Jude',
  //   'Sweet Child O\' Mine',
  //   'Wonderwall',
  //   'Billie Jean',
  //   'Come Together'
  // ];

  filteredArtists!: Observable<string[]>;
  filteredSongs!: Observable<string[]>;

  constructor(
    private cdr: ChangeDetectorRef, 
    private store: Store,
    private mainService: MainService ) { }

  ngOnInit() {
    this.preferenceForm = new FormGroup({
      username: new FormControl('',),
      password: new FormControl('')
    });

    this.filteredArtists = this.artistControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.artists))
    );

    this.filteredSongs = this.songControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.songs))
    );

    this.getArtists();
  }

  addSongToPreferences() {
    const artist = this.artistControl.value;
    const name = this.songControl.value;
    if (!artist || !name) {
      return;
    }
    let song: SongInfo = { artist: artist, name: name };
    this.store.dispatch(new AddSongToPlaylist(song));
    this.artistControl.setValue('');
    this.songControl.setValue('');
    this.cdr.detectChanges();
  }

  showPreferences() {
    console.log(this.choices);
  }

  displayFn(value: string): string {
    return value ? value : '';
  }

  getArtists(): any {
    this.mainService.getArtists().subscribe((artists) => {
      this.artists = (artists as any[]).map((a: any) => a.ArtistName);
      console.log(JSON.stringify(artists));
    });
  }

  getSongsByArtist(artistId: string): any {
    this.mainService.getSongsByArtist(Number(artistId)).subscribe((songs) => {
      this.songs = (songs as any[]).map((s: any) => s.songName);
      console.log(JSON.stringify(songs));
    });
  }


  // validateInput(event: Event, options: string[]): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   const value = inputElement.value;
    
  //   // Check if the input value exists in the full list of options
  //   const match = this.options.find(option => option.name === value);

  //   if (!match) {
  //     // If no match, clear the input value (or reset to a previous valid state)
  //     this.event..setValue(null); 
  //   }
  // }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
