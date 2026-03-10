import { Choice } from "../models/choice";

export class AddSongToPlaylist {
    static readonly type = '[Main] Add Song To Playlist';
    constructor(public payload: Choice) { }
}

export class RemoveSongFromPlaylist {
    static readonly type = '[Main] Remove Song From Playlist';
    constructor(public index: number) { }
}

export class ClearPlaylist {
    static readonly type = '[Main] Clear Playlist';
}

export class GetRecommendations {
    static readonly type = '[Main] Get Recommendations';
    constructor(public trackIds: string[]) { } 
}