import { SongInfo } from "../models/song-info";

export class AddSongToPlaylist {
    static readonly type = '[Main] Add Song To Playlist';
    constructor(public payload: SongInfo) { }
}