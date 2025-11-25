import { fetchPopularMovieList } from "@api";
import { MovieCard } from "@components";
import { NowPlayingCarousel } from "@components";
import { ErrorMessage, MovieCardSkeleton } from "@components";
import { useFetch } from "@hooks";

export const Home = () => {
  const { data, error, isLoading } = useFetch({
    queryFn: fetchPopularMovieList,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="flex flex-col bg-neutral-50">
      <NowPlayingCarousel />
      <section className="mx-auto grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          : data?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </section>
    </div>
  );
};
