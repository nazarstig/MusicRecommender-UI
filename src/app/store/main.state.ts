import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Choice } from "../models/choice";
import { IMainState } from "./main-state.interface";
import { AddSongToPlaylist, ClearPlaylist, GetRecommendations, RemoveSongFromPlaylist } from "./main.actions";
import { MainService } from "../services/main.service";
import { Injectable } from "@angular/core";

export const initialState: IMainState = {
  playlistSongs: [],
  recommendations: []
};

@State<IMainState>({
  name: 'main',
  defaults: initialState
})
@Injectable()
export class MainState {

  constructor(private readonly mainService: MainService) {}

  @Selector()
  static getPlaylistSongs(state: IMainState): Choice[] {
    return state.playlistSongs;
  }

  @Selector()
  static getRecommendations(state: IMainState): Choice[] {
    return state.recommendations;
  }

  @Action(AddSongToPlaylist)
  addSongToPlaylist(ctx: StateContext<IMainState>, action: AddSongToPlaylist) {
    const state = ctx.getState();
    if (state.playlistSongs.find(song => song.TrackId === action.payload.TrackId)) {
      return;
    }
    ctx.setState({
      ...state,
      playlistSongs: [...state.playlistSongs, action.payload]
    });
  }

  @Action(ClearPlaylist)
  clearPlaylist(ctx: StateContext<IMainState>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      playlistSongs: []
    });
  }

  @Action(RemoveSongFromPlaylist)
  removeSongFromPlaylist(ctx: StateContext<IMainState>, action: RemoveSongFromPlaylist) {
    const state = ctx.getState();
    const updatedPlaylist = state.playlistSongs.filter((_, index) => index !== action.index);
    ctx.setState({
      ...state,
      playlistSongs: updatedPlaylist
    });
  }

  @Action(GetRecommendations)
  getRecommendations(ctx: StateContext<IMainState>, action: GetRecommendations) {
    const state = ctx.getState();
    // Placeholder for actual recommendation logic
    this.mainService.getRecommendations(action.trackIds).subscribe(recommendations => {
      const recommendation: Choice[] = recommendations;
      ctx.setState({
        ...state,
        recommendations: recommendations
      });
    });
  }
}