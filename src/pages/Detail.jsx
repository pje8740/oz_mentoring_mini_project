import { fetchMovieDetail } from "@api";
import { TMDB_IMAGE_URL } from "@constants";
import useFetch from "@hooks/useFetch";
import { useParams } from "react-router";

export const Detail = () => {
  const { id: movieId } = useParams();
  const { data, error, isLoading } = useFetch({
    queryFn: (options) => fetchMovieDetail({ movieId, ...options }),
    queryKey: [movieId],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const {
    backdropPath,
    genres = [],
    overview,
    title,
    voteAverage,
  } = data || {};

  return (
    <main>
      <div>
        <div>
          <img alt={title} src={TMDB_IMAGE_URL + backdropPath} />
        </div>
        <article>
          <header>
            <div>
              <p>Movie Detail</p>
              <h1>{title}</h1>
            </div>
            <div>
              <span>
                {Number.isFinite(voteAverage) ? voteAverage.toFixed(1) : "N/A"}
              </span>
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id ?? genre.name}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </header>
          <section>
            <h2>줄거리</h2>
            <p>{overview}</p>
          </section>
        </article>
      </div>
    </main>
  );
};
