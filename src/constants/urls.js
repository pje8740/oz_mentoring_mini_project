export const TMDB_API_URL = "https://api.themoviedb.org/3";

export const API_ROUTES = {
  MOVIE_DETAIL: ({ movieId }) => `movie/${movieId}`,
  POPULAR_MOVIES: "movie/popular",
};

export const ROUTE_PATHS = {
  DETAIL: "/detail/:id",
  HOME: "/",
  NOT_FOUND: "*",
};
