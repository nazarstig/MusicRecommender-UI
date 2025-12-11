import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  standalone: false,
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  groupControl = new FormControl('');
  songControl = new FormControl('');

  groups: string[] = [
    'The Beatles',
    'Queen',
    'Led Zeppelin',
    'Pink Floyd',
    'The Rolling Stones',
    'Nirvana',
    'Radiohead',
    'Arctic Monkeys',
    'The Strokes',
    'Red Hot Chili Peppers'
  ];

  songs: string[] = [
    'Bohemian Rhapsody',
    'Stairway to Heaven',
    'Hotel California',
    'Smells Like Teen Spirit',
    'Imagine',
    'Hey Jude',
    'Sweet Child O\' Mine',
    'Wonderwall',
    'Billie Jean',
    'Come Together'
  ];

  filteredGroups!: Observable<string[]>;
  filteredSongs!: Observable<string[]>;

  ngOnInit() {
    this.filteredGroups = this.groupControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.groups))
    );

    this.filteredSongs = this.songControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.songs))
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
