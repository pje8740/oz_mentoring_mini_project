import { API_ROUTES, TMDB_API_URL } from "@constants";

const defaltOptions = {
  header: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const fetchNowPlayingMovies = async ({ page = 1, signal }) => {
  const apiUrl = new URL(API_ROUTES.NOW_PLAYING, TMDB_API_URL);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("language", "ko-KR");

  const response = await fetch(apiUrl, {
    ...defaltOptions,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();

  return {
    dates: result.dates,
    page: result.page,
    results: result.results
      .filter((movie) => movie.adult === false)
      .map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        voteAverage: movie.vote_average,
      })),
  };
};
