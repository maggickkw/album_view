// slices/albumSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlbumState {
  albums: string[];
  photos: any[]; // Update the type as needed for your photo data
}

const initialState: AlbumState = {
  albums: [],
  photos: [],
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbums(state, action: PayloadAction<string[]>) {
      state.albums = action.payload;
    },
    removeAlbum(state, action: PayloadAction<string>) {
      state.albums = state.albums.filter((album) => album !== action.payload);
    },
    setPhotos(state, action: PayloadAction<any[]>) {
      state.photos = action.payload;
    },
    removePhoto(state, action: PayloadAction<number>) {
      state.photos = state.photos.filter((photo) => photo.id !== action.payload);
    },
  },
});

export const { setAlbums, removeAlbum, setPhotos, removePhoto } = albumSlice.actions;
export const selectAlbums = (state: { album: AlbumState }) => state.album.albums;
export const selectPhotos = (state: { album: AlbumState }) => state.album.photos;

export default albumSlice.reducer;
