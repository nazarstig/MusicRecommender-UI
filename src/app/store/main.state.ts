import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SongInfo } from "../models/song-info";
import { IMainState } from "./main-state.interface";
import { AddSongToPlaylist } from "./main.actions";

export const initialState: IMainState = {
  playlistSongs: []
};

@State<IMainState>({
    name: 'main',
    defaults: initialState
})
export class MainState {
    @Selector()
    static getPlaylistSongs(state: IMainState): SongInfo[] {
        return state.playlistSongs;
    }

    @Action(AddSongToPlaylist)
    addSongToPlaylist(ctx: StateContext<IMainState>, action: AddSongToPlaylist) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            playlistSongs: [...state.playlistSongs, action.payload]
        });
    }
}