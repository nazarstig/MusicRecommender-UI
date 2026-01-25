import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { Song } from '../models/song';
import { Choice } from '../models/choice';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  mainUrl: string = 'http://localhost:8000/api';

  constructor(private readonly http: HttpClient) { }

  getArtists(artistName: string = ''): Observable<Artist[]> {
    const url = `${this.mainUrl}/artists?artistName=${artistName}`;
    return this.http.get<Artist[]>(url);
  }

  getSongsByArtist(artistId: string): Observable<Song[]> {
    const url = `${this.mainUrl}/songs?artistId=${artistId}`;
    return this.http.get<Song[]>(url);
  }

  getRecommendations(): Observable<Choice[]> {
    const url = `${this.mainUrl}/recommendations`;
    return this.http.get<Choice[]>(url);
  }
}
