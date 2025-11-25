import { fetchMovieDetail } from "@api";
import { ErrorMessage, LoadingSpinner } from "@components";
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
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const {
    backdropPath,
    genres = [],
    overview,
    title,
    voteAverage,
  } = data || {};

  return (
    <main className="bg-neutral-50 pb-8 text-neutral-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 lg:flex-row lg:items-start">
        <div className="flex w-full items-center justify-center lg:max-w-sm">
          <img
            alt={title}
            className="aspect-video w-full rounded-3xl object-cover shadow-2xl lg:aspect-2/3"
            src={TMDB_IMAGE_URL + backdropPath}
          />
        </div>
        <article className="flex w-full flex-1 flex-col gap-8">
          <header className="space-y-4">
            <div>
              <p className="text-sm tracking-widest text-neutral-500 uppercase">
                Movie Detail
              </p>
              <h1 className="mt-1 text-3xl leading-tight font-bold text-neutral-900 lg:text-4xl">
                {title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 rounded-full border border-yellow-400 px-3 text-sm text-yellow-500">
                {Number.isFinite(voteAverage) ? voteAverage.toFixed(1) : "N/A"}
              </span>
              <ul className="flex flex-wrap gap-2 text-sm text-neutral-700">
                {genres.map((genre) => (
                  <li
                    className="rounded-full bg-neutral-200 px-3 py-1"
                    key={genre.id ?? genre.name}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">줄거리</h2>
            <p className="mt-3 leading-relaxed text-neutral-700">{overview}</p>
          </section>
        </article>
      </div>
    </main>
  );
};
