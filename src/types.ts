export interface SearchParams {
  page?: number;
  limit?: number;
}

export interface SearchResult {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: Joke[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}

export interface Joke {
  id: string;
  joke: string;
}
