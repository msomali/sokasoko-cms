import { createAsyncThunk } from "@reduxjs/toolkit";
import get from "lodash/get";
import axios from "../../Players/services";

export const fetchMedia = createAsyncThunk(
  "media/fetchMedia",
  async (value) => {
    const page = get(value, "page", 1);
    const limit = get(value, "pageSize", 200);

    const { data } = await axios.get("/v1/medias", {
      params: { query: { type: "Link" }, page, limit },
    });
    return data;
  }
);

export const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async (value) => {
    const page = get(value, "page", 1);
    const limit = get(value, "pageSize", 200);

    const { data } = await axios.get("/v1/videos", {
      params: { page, limit },
    });
    return data;
  }
);

export const createPlaylist = createAsyncThunk(
  "media/create",
  async (values) => {
    const { data } = await axios.post("/v1/playlists", values);
    return data;
  }
);

export const createVideo = createAsyncThunk("video/create", async (values) => {
  const { data } = await axios.post("/v1/videos", values);
  return data;
});

export const updateAdvert = createAsyncThunk(
  "media/advertUpdate",
  async (values) => {
    const { data } = await axios.post("/v1/currentAdvert", values);
    return data;
  }
);

export const updateAdvertTimer = createAsyncThunk(
  "media/advertUpdateTimer",
  async (values) => {
    const { data } = await axios.post("/v1/currentAdvertTimer", values);
    return data;
  }
);

export const fetchPlaylist = createAsyncThunk(
  "media/fetchPlaylist",
  async () => {
    const { data } = await axios.get("/v1/playlists");
    return data;
  }
);

export const setActivePlaylist = createAsyncThunk(
  "media/setActivePlaylist",
  async (id) => {
    const { data } = await axios.patch(`/v1/playlists/${id}`, {
      isActive: true,
    });
    return data;
  }
);

export const setActiveVideo = createAsyncThunk(
  "video/setActiveVideo",
  async (id) => {
    const { data } = await axios.patch(`/v1/videos/${id}`, {
      active: true,
    });
    return data;
  }
);

export const deleteVideo = createAsyncThunk("video/deleteVideo", async (id) => {
  const { data } = await axios.delete(`/v1/videos/${id}`);
  return data;
});
