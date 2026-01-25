import { Choice } from "../models/choice";

export class AddSongToPlaylist {
    static readonly type = '[Main] Add Song To Playlist';
    constructor(public payload: Choice) { }
}

export class GetRecommendations {
    static readonly type = '[Main] Get Recommendations';
    constructor() { } 
}