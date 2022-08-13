import { createAsyncThunk } from "@reduxjs/toolkit";
import get from "lodash/get";
import axios from "../../Players/services";

export const fetchPlayers = createAsyncThunk(
  "player/fetchAllPlayers",
  async (value) => {
    const page = get(value, "page", 1);
    const limit = get(value, "pageSize", 10);

    const { data } = await axios.get("/v1/users", {
      params: { page, limit },
    });
    return data;
  }
);

export const deletePlayer = createAsyncThunk(
  "player/deletePlayer",
  async ({ id }) => {
    const { data } = await axios.delete(`/v1/users/${id}`);
    return data;
  }
);

export const suspendUser = createAsyncThunk("player/suspend", async (value) => {
  const id = get(value, "id");
  const message = get(value, "reason");
  const { data } = await axios.post(`/v1/users/suspend/${id}`, { message });
  return data;
});

export const unSuspendUser = createAsyncThunk(
  "player/unSuspend",
  async (value) => {
    const id = get(value, "id");
    const { data } = await axios.post(`/v1/users/unsuspend/${id}`);
    return data;
  }
);

export const fetchAdverts = createAsyncThunk(
  "advert/fetchAllAdverts",
  async () => {
    const { data } = await axios.get("/v1/adverts");
    return data;
  }
);

export const fetchCoaches = createAsyncThunk(
  "coach/fetchAllCoaches",
  async () => {
    const { data } = await axios.get("/v1/coachs");
    return data;
  }
);

export const fetchAcademies = createAsyncThunk(
  "academy/fetchAllAcademys",
  async () => {
    const { data } = await axios.get("/v1/academys");
    return data;
  }
);

export const fetchGuardian = createAsyncThunk(
  "guardian/fetchAllGuardians",
  async () => {
    const { data } = await axios.get("/v1/guardians");
    return data;
  }
);

export const searchGuardians = createAsyncThunk(
  "guardian/search",
  async (query) => {
    const response = await axios.get("/v1/guardian", {
      params: { query: { $text: { $search: query } } },
    });
    return response.data;
  }
);

export const searchPlayers = createAsyncThunk(
  "player/search",
  async (payload) => {
    const response = await axios.get("/v1/users/search", {
      params: { query: { text: payload } },
    });
    console.log("Response", response);
    return response.data;
  }
);

export const searchCoaches = createAsyncThunk("coach/search", async (query) => {
  const response = await axios.get("/v1/coachs", {
    params: { query: { $text: { $search: query } } },
  });
  return response.data;
});

export const searchAcademies = createAsyncThunk(
  "academy/search",
  async (query) => {
    const response = await axios.get("/v1/academys", {
      params: { query: { $text: { $search: query } } },
    });
    return response.data;
  }
);

export const createPlayer = createAsyncThunk(
  "player/create",
  async (values) => {
    const { data } = await axios.post("/v1/users", values);
    return data;
  }
);

export const createAdvert = createAsyncThunk(
  "advert/create",
  async (values) => {
    const { data } = await axios.post("/v1/adverts", values);
    return data;
  }
);

export const deleteAdvert = createAsyncThunk(
  "advert/deleteAdvert",
  async ({ id }) => {
    const { data } = await axios.delete(`/v1/adverts/${id}`);
    return data;
  }
);
