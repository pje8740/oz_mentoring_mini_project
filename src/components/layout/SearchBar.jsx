import { ROUTE_PATHS } from "@constants/urls";
import { useDebounce } from "@hooks";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce({ delay: 500, value: searchQuery });

  const shouldSyncQueryRef = useRef(false);

  useLayoutEffect(() => {
    if (location.pathname !== ROUTE_PATHS.SEARCH) {
      shouldSyncQueryRef.current = false;
      setSearchQuery("");
      return;
    }

    const currentQueryParam =
      new URLSearchParams(location.search).get("query") ?? "";

    shouldSyncQueryRef.current = false;
    setSearchQuery((prev) =>
      prev === currentQueryParam ? prev : currentQueryParam,
    );
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!shouldSyncQueryRef.current) {
      return;
    }

    const trimmedQuery = debouncedSearchQuery.trim();

    if (!trimmedQuery) {
      if (location.pathname === ROUTE_PATHS.SEARCH && location.search !== "") {
        navigate(ROUTE_PATHS.SEARCH, { replace: true });
      }
      shouldSyncQueryRef.current = false;
      return;
    }

    const encodeQuery = encodeURIComponent(trimmedQuery);
    const targetSearch = `${ROUTE_PATHS.SEARCH}?query=${encodeQuery}`;

    if (isAlreadyOnTarget) {
      shouldSyncQueryRef.current = false;
      return;
    }

    navigate(targetSearch, {
      replace: location.pathname === ROUTE_PATHS.SEARCH,
    });
    shouldSyncQueryRef.current = false;
  }, [debouncedSearchQuery, location.pathname, location.search, navigate]);

  const handleInputChange = (e) => {
    shouldSyncQueryRef.current = true;
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleInputChange}
        placeholder="검색어를 입력해주세요."
        type="text"
        value={searchQuery}
      />
    </div>
  );
};
export default SearchBar;
