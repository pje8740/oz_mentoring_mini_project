import { fetchPopularMovieList } from "@api";
import { MovieCard } from "@components";
import { useFetch } from "@hooks";

export const Home = () => {
  const { data, error, isLoading } = useFetch({
    queryFn: fetchPopularMovieList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <section>
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};
