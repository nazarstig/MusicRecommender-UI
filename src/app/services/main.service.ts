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

  getRecommendations(trackIds: string[]): Observable<Choice[]> {
    const url = `${this.mainUrl}/recommendations`;
    return this.http.post<Choice[]>(url, { "track_ids": trackIds });
  }

  getRecommendations_test(): Observable<Choice[]> {
    const ids: string[] = [
      "c4d39965-d309-4863-b632-4f26920df4db",
      "6aa61f81-fe9f-43f1-a712-32492a40983a",
      "55dc4892-b5ae-44bd-79e98-2a0d4dd53cbc",
      "cada1d51-60db-4592-ab5f-ed36a4516703",
      "3a0be7df-1b08-40ad-816f-b8e3c3e17aea"
    ];
    const url = `${this.mainUrl}/recommendations`;
    return this.http.post<Choice[]>(url, { "track_ids": ids });
  }
}
