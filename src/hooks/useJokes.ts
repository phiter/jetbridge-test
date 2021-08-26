import { useEffect, useState } from "react";
import { JokeRepository } from "../api/JokeRepository";
import { Joke } from "../types";

export const useJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJokes = async (page: number) => {
    const { data } = await JokeRepository.search({ page, limit: 10 });
    setJokes(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    fetchJokes(currentPage);
  }, [currentPage]);

  return {
    jokes,
    setCurrentPage,
    totalPages,
    currentPage
  };
};
