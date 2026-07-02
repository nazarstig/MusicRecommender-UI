# MusicRecommender-UI — Architecture & Patterns

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 |
| State Management | NGXS 19 |
| UI Components | Angular Material 19 |
| Forms | Angular Reactive Forms |
| HTTP | Angular `HttpClient` |
| Testing | Karma + Jasmine |
| Language | TypeScript 5.7 |

---

## Project Structure

```
src/app/
├── app.module.ts              # Root NgModule — declares all components, imports all Angular/Material modules
├── app.config.ts              # Standalone app config (router only — not yet in use)
├── app.routes.ts              # Router config (empty — single-page, no routing)
├── app.component.*            # Root shell component
│
├── components/
│   ├── main-page/             # Smart (container) component
│   ├── add-song/              # Smart component — artist/song search + playlist dispatch
│   ├── playlist-table/        # Dumb (presentational) component — reused for playlist & recommendations
│   └── criterias-list/        # Form component — criteria inputs (not yet wired to store)
│
├── models/
│   ├── artist.ts              # { ArtistId, ArtistName }
│   ├── song.ts                # { TrackId, ArtistId, TrackName }
│   └── choice.ts              # { ArtistId, ArtistName, TrackId, TrackName }
│
├── services/
│   └── main.service.ts        # All HTTP calls — single service, base URL constant
│
└── store/
    ├── main-state.interface.ts # IMainState shape
    ├── main.actions.ts         # NGXS action classes
    └── main.state.ts           # NGXS state class — selectors + action handlers
```

---

## State Management — NGXS

### State Shape (`IMainState`)

```ts
{
  playlistSongs: Choice[];     // User's selected songs (input to recommendation engine)
  recommendations: Choice[];   // Recommended songs returned from API
  isLoading: boolean;          // Global loading flag for HTTP calls
}
```

### Actions

| Action Class | Payload | Effect |
|---|---|---|
| `AddSongToPlaylist` | `Choice` | Appends to `playlistSongs` (deduplicates by `TrackId`) |
| `RemoveSongFromPlaylist` | `index: number` | Removes by index from `playlistSongs` |
| `ClearPlaylist` | — | Resets `playlistSongs` to `[]` |
| `GetRecommendations` | `trackIds: string[]` | Calls API, updates `recommendations` |
| `GetRecommendationsTest` | `trackIds: string[]` | Calls API with hardcoded IDs (dev/test helper) |

### Data Flow

```
Component
  └─ store.dispatch(new Action(...))
       └─ @Action handler in MainState
            ├─ ctx.patchState({ isLoading: true })
            ├─ mainService.getRecommendations(ids)  ← HTTP POST
            │    └─ tap: ctx.patchState({ recommendations })
            │    └─ catchError: ctx.patchState({ recommendations: [] })
            │    └─ finalize: ctx.patchState({ isLoading: false })
            └─ Component re-renders via @Select observable + async pipe
```

---

## Component Patterns

### Smart (Container) Components
`MainPageComponent`, `AddSongComponent`

- Use `@Select(MainState.selector)` to bind to state slices as `Observable<T>`
- Dispatch actions via `this.store.dispatch(new Action(...))`
- Use `store.selectSnapshot()` for synchronous one-off reads before dispatch
- Render reactive data with the `async` pipe in templates

### Dumb (Presentational) Component
`PlaylistTableComponent`

- Receives data only via `@Input()` — no direct store or service dependencies
- Communicates upward via `@Output() EventEmitter`
- Reused for both the user's playlist and the recommendations table; behavior is controlled by `showDeleteButton` input
- Column definition is derived via a getter from the `showDeleteButton` flag

### Form Component
`CriteriasListComponent`

- Uses Angular `ReactiveFormsModule` (`FormGroup` + `FormControl`)
- Currently manages: `genre`, `mood`, `era`, `language`, `tempo`, `artist`
- Not yet dispatching to the store (form values not wired to actions)

---

## HTTP Service (`MainService`)

- Single injectable service, `providedIn: 'root'`
- Base URL: `http://localhost:8000/api` (hardcoded constant — backend expected locally)
- All methods return `Observable<T>` — consumed inside NGXS action handlers

| Method | HTTP | Endpoint | Returns |
|---|---|---|---|
| `getArtists(name?)` | GET | `/artists?artistName=` | `Artist[]` |
| `getSongsByArtist(id)` | GET | `/songs?artistId=` | `Song[]` |
| `getRecommendations(ids)` | POST | `/recommendations` | `Choice[]` |
| `getRecommendations_test()` | POST | `/recommendations` | `Choice[]` (hardcoded IDs) |

---

## Forms & Autocomplete (`AddSongComponent`)

- **Artist field**: server-side filtering — `valueChanges` piped through `switchMap` → `mainService.getArtists(value)`, debouncing implicit via switchMap
- **Song field**: client-side filtering — local `songs[]` array filtered with `map` after artist selection
- Selection handlers (`artistSelectHandler`, `songSelectHandler`) capture the full object from the Material autocomplete `optionSelected` event
- `displayWith` functions map `Artist → ArtistName` and `Song → TrackName` for the input display value

---

## Module Setup

- `AppModule` is NgModule-based; all components use `standalone: false`
- `app.config.ts` and `app.routes.ts` exist (Angular 17+ standalone bootstrapping scaffolding) but routing is empty and the app still bootstraps via `AppModule`
- Angular Material modules are imported individually (not `MatNativeDateModule` or wildcard)
- `NgxsModule.forRoot([MainState])` registers the single state slice

---

## Change Detection

- `MainPageComponent` uses `ChangeDetectionStrategy.OnPush` — re-renders only on new observable emissions or explicit markings
- Other components use the default strategy
- `AddSongComponent` injects `ChangeDetectorRef` and calls `cdr.detectChanges()` after adding a song to force a UI refresh

---

## Naming Conventions

- **Files**: kebab-case (`main-page.component.ts`)
- **Classes/Interfaces**: PascalCase (`MainState`, `IMainState`)
- **Interfaces**: prefixed with `I` (`IMainState`)
- **Model properties**: PascalCase matching backend API shape (`ArtistId`, `TrackName`)
- **Action types**: `'[Namespace] Verb Noun'` pattern (`'[Main] Add Song To Playlist'`)
- **CSS classes**: kebab-case (`main-container`, `add-song-btn`)
