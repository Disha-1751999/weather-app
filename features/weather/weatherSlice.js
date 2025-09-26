import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseForecast } from "@/utils/parseForecast";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log("API Key:", apiKey);
console.log("Base URL:", baseUrl);

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { getState }) => {
    const state = getState().weather;
    const selectedUnit = state.unit;
    const city = state.city;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(
        `${baseUrl}/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedUnit}`
      ),
      axios.get(
        `${baseUrl}/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${selectedUnit}`
      ),
    ]);

    const { hourly, daily } = parseForecast(forecastRes.data.list);

    return {
      data: currentRes.data,
      forecast: forecastRes.data,
      hourly,
      daily,
      unit: selectedUnit,
      city,
    };
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "weather/fetchCitySuggestions",
  async (query) => {
    if (!query) return [];
    const response = await axios.get(
      `${baseUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    forecast: null,
    hourly: [],
    daily: [],
    status: "idle",
    error: null,
    unit: "metric",
    city: "",
    suggestions: [],
    suggestionsStatus: "idle",
  },
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload.data;
        state.forecast = action.payload.forecast;
        state.hourly = action.payload.hourly;
        state.daily = action.payload.daily;
        state.unit = action.payload.unit;
        state.city = action.payload.city;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          "Something went wrong. Please enter a valid city name and try again.";
        state.data = null;
        state.forecast = null;
        state.hourly = [];
        state.daily = [];
        state.city = "";
        state.suggestions = [];
        state.suggestionsStatus = "idle";
      })
      .addCase(fetchCitySuggestions.pending, (state) => {
        state.suggestionsStatus = "loading";
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.suggestionsStatus = "succeeded";
        state.suggestions = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state, action) => {
        state.suggestionsStatus = "failed";
        //state.error = "Failed to fetch city suggestions";
      });
  },
});

export const { setUnit, setCity, clearSuggestions } = weatherSlice.actions;
export default weatherSlice.reducer;
