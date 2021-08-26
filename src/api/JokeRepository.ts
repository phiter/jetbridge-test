import { SearchParams, SearchResult } from "../types";
import { api } from "./api";

export const JokeRepository = {
  search(params: SearchParams) {
    return api.get<SearchResult>("/search", { params });
  }
};
