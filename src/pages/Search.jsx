import { fetchSearchMovies } from "@api/fetchSearchMovies";
import { MovieCard } from "@components";
import useFetch from "@hooks";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();
  const hasQuery = query.length > 0;

  const { data, error, isLoading } = useFetch({
    queryFn: hasQuery
      ? (options) => fetchSearchMovies({ query, ...options })
      : undefined,
    queryKey: hasQuery ? ["search", query] : ["search"],
  });

  if (!hasQuery) {
    return (
      <div>
        <p>검색어를 입력해 주세요.</p>
      </div>
    );
  }
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>ErrorL {error.message}</div>;
  }

  if (!data?.results?.length) {
    return (
      <div>
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }
  return (
    <div>
      <section>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};
export default Search;
