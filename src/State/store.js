import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  fetchPlayers,
  fetchAdverts,
  searchPlayers,
} from "../State/actions/players";
import { fetchMedia, fetchPlaylist, fetchVideo } from "../State/actions/medias";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    authStart(state) {
      return { ...state, loading: true, error: null };
    },
    authSuccess(state, action) {
      return { ...state, token: action.payload, loading: false };
    },
    authFail(state, action) {
      return { ...state, error: action.payload, loading: false };
    },
    authLogout(state) {
      return { ...state, token: null };
    },
  },
});

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    items: {
      data: [],
      total: 0,
      size: 0,
      limit: 10,
      skip: 0,
      page: 1,
      pages: 1,
      hasMore: false,
    },
    selected: null,
    loading: false,
    error: null,
    q: undefined,
  },
  reducers: {
    search: (state, action) => {
      state.q = action.payload;
    },
    clearSearch: (state) => {
      state.q = undefined;
    },
    selectPlayer: (state, action) => {
      state.selected = action.payload;
    },
    clearSelectPlayer: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchPlayers.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(searchPlayers.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(searchPlayers.fulfilled, (state, { payload }) => {
      return { ...state, items: { ...payload }, loading: false };
    });
    builder.addCase(fetchPlayers.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(fetchPlayers.fulfilled, (state, { payload }) => {
      return { ...state, items: { ...payload }, loading: false };
    });
  },
});

export const advertSlice = createSlice({
  name: "advert",
  initialState: {
    items: {
      data: [],
      total: 0,
      size: 0,
      limit: 10,
      skip: 0,
      page: 1,
      pages: 1,
      hasMore: false,
    },
    loading: false,
    error: null,
    q: undefined,
  },
  reducers: {
    search: (state, action) => {
      state.q = action.payload;
    },
    clearSearch: (state) => {
      state.q = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdverts.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchAdverts.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(fetchAdverts.fulfilled, (state, { payload }) => {
      return { ...state, items: { ...payload }, loading: false };
    });
  },
});

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    list: [],
    selected: [],
    total: 0,
    size: 0,
    limit: 10,
    skip: 0,
    page: 1,
    pages: 1,
    hasMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    selectMedia: (state, action) => {
      return { ...state, selected: [...action.payload] };
    },
    clearSelectedMedia: (state) => {
      return { ...state, selected: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMedia.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchMedia.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(fetchMedia.fulfilled, (state, { payload }) => {
      return { ...state, list: [...payload.data], ...payload, loading: false };
    });
  },
});

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    list: [],
    selected: [],
    total: 0,
    size: 0,
    limit: 10,
    skip: 0,
    page: 1,
    pages: 1,
    hasMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    selectPlaylist: (state, action) => {
      return { ...state, selected: [...action.payload] };
    },
    clearSelectedPlaylist: (state) => {
      return { ...state, selected: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, { payload }) => {
      return { ...state, list: [...payload.data], ...payload, loading: false };
    });
  },
});

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    list: [],
    selected: [],
    total: 0,
    size: 0,
    limit: 10,
    skip: 0,
    page: 1,
    pages: 1,
    hasMore: false,
    loading: false,
    error: null,
  },
  reducers: {
    selectPlaylist: (state, action) => {
      return { ...state, selected: [...action.payload] };
    },
    clearSelectedPlaylist: (state) => {
      return { ...state, selected: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(fetchVideo.fulfilled, (state, { payload }) => {
      return { ...state, list: [...payload.data], ...payload, loading: false };
    });
  },
});

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  player: playerSlice.reducer,
  advert: advertSlice.reducer,
  media: mediaSlice.reducer,
  playlist: playlistSlice.reducer,
  video: videoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const { search, clearSearch, selectPlayer, clearSelectPlayer } =
  playerSlice.actions;

export const { dispatch } = store;
