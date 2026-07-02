import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Choice } from "../models/choice";
import { IMainState } from "./main-state.interface";
import { AddSongToPlaylist, ClearPlaylist, GetRecommendations, GetRecommendationsTest, RemoveSongFromPlaylist } from "./main.actions";
import { MainService } from "../services/main.service";
import { Injectable } from "@angular/core";
import { catchError, finalize, tap } from "rxjs/operators";
import { of } from "rxjs";

export const initialState: IMainState = {
  playlistSongs: [],
  recommendations: [],
  isLoading: false
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

  @Selector()
  static getIsLoading(state: IMainState): boolean {
    return state.isLoading;
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
    ctx.patchState({ isLoading: true });

    return this.mainService.getRecommendations(action.trackIds).pipe(
      tap((recommendations) => {
        ctx.patchState({ recommendations });
      }),
      catchError(() => {
        ctx.patchState({ recommendations: [] });
        return of([] as Choice[]);
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }

  @Action(GetRecommendationsTest)
  getRecommendationsTest(ctx: StateContext<IMainState>, action: GetRecommendationsTest) {
    ctx.patchState({ isLoading: true });

    return this.mainService.getRecommendations_test().pipe(
      tap((recommendations) => {
        ctx.patchState({ recommendations });
      }),
      catchError(() => {
        ctx.patchState({ recommendations: [] });
        return of([] as Choice[]);
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      })
    );
  }
}