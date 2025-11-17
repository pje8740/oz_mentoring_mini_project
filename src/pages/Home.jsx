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
    <div className="flex flex-col items-center">
      <section className="mx-auto grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};
