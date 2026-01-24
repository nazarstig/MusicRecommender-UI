import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  mainUrl: string = 'http://localhost:8000/api';

  constructor(private readonly http: HttpClient) { }

  getArtists() {
    const url = `${this.mainUrl}/artists`;
    return this.http.get(url);
  }

  getSongsByArtist(artistId: number) {
    const url = `${this.mainUrl}/songs?artistId=${artistId}`;
    return this.http.get(url);
  }
}
