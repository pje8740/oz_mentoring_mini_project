import { ROUTE_PATHS } from "@constants/urls";
import { useDebounce } from "@hooks";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const SearchBar = () => {
  // --- 1. 도구 준비하기 ---

  // 페이지를 이동시키는 네비게이션 도구 (운전대 같은 역할)
  const navigate = useNavigate();

  // 현재 내가 어느 페이지(주소)에 있는지 정보를 담고 있는 도구
  const location = useLocation();

  // --- 2. 기억해야 할 값들 (State) ---

  // 'searchQuery': 검색창에 지금 적혀있는 글자를 저장하는 메모지
  // 'setSearchQuery': 그 메모지에 글을 쓰는 펜
  const [searchQuery, setSearchQuery] = useState("");

  // 'debouncedSearchQuery':
  // 타자를 다다닥 칠 때마다 검색하면 컴퓨터가 힘드니까,
  // 타자가 멈추고 0.5초(500ms) 뒤에 "이게 최종 검색어다!"라고 알려주는 값
  const debouncedSearchQuery = useDebounce({ delay: 500, value: searchQuery });

  // --- 3. 중요한 신호등 (Ref) ---

  // 'shouldSyncQueryRef':
  // 내가 타자를 쳐서 주소를 바꿔야 하는지, 아니면 그냥 주소가 바뀌어서 따라가는 건지 구분하는 깃발이에요.
  // true면 "내가 입력 중!", false면 "난 가만히 있었음"
  const shouldSyncQueryRef = useRef(false);

  // --- 4. [주소창 -> 검색창] 동기화 ---
  // 브라우저 주소창이 바뀌었을 때, 검색창(input)에도 그 내용을 채워넣는 부분이에요.
  useLayoutEffect(() => {
    // 만약 지금 '검색 페이지'가 아니라면?
    if (location.pathname !== ROUTE_PATHS.SEARCH) {
      shouldSyncQueryRef.current = false; // 입력 모드가 아님
      setSearchQuery(""); // 검색창을 싹 비워요.
      return; // 여기서 끝!
    }

    // 주소창 뒤에 있는 '?query=사과' 같은 부분에서 '사과'라는 글자를 가져와요.
    const currentQueryParam =
      new URLSearchParams(location.search).get("query") ?? "";

    shouldSyncQueryRef.current = false; // 이건 내가 타이핑한 게 아니니까 깃발을 내려요.

    // 가져온 글자를 검색창 상태에 넣어줘요 (이미 같으면 놔두고, 다르면 업데이트)
    setSearchQuery((prev) =>
      prev === currentQueryParam ? prev : currentQueryParam,
    );
  }, [location.pathname, location.search]); // 주소가 바뀔 때마다 실행돼요.

  // --- 5. [검색창 -> 주소창] 동기화 ---
  // 사용자가 검색어를 확정(0.5초 경과)지었을 때, 주소창을 바꾸는 부분이에요.
  useEffect(() => {
    // 내가 타이핑해서 바꿀 상황이 아니라면(깃발이 내려가 있으면) 아무것도 안 해요.
    // (주소창이 바뀌어서 검색창이 변한 경우, 다시 주소창을 바꾸지 않게 막는 역할)
    if (!shouldSyncQueryRef.current) {
      return;
    }

    // 검색어 양쪽의 공백(띄어쓰기)을 제거해요.
    const trimmedQuery = debouncedSearchQuery.trim();

    // 1. 검색어가 다 지워져서 없다면?
    if (!trimmedQuery) {
      // 지금 검색 페이지라면 메인(HOME) 페이지로 돌아가요.
      if (location.pathname === ROUTE_PATHS.SEARCH) {
        navigate(ROUTE_PATHS.HOME, { replace: true });
      }
      shouldSyncQueryRef.current = false; // 작업 끝났으니 깃발 내리기
      return;
    }

    // 2. 검색어가 있다면?
    // 한글이나 특수문자가 주소창에서 깨지지 않게 암호화(인코딩)해요.
    const encodeQuery = encodeURIComponent(trimmedQuery);
    // 이동할 목표 주소를 만들어요. 예: "/search?query=사과"
    const targetSearch = `${ROUTE_PATHS.SEARCH}?query=${encodeQuery}`;

    // 이미 그 주소에 있다면 굳이 또 이동하지 않아요.
    const isAlreadyOnTarget =
      location.pathname + location.search === targetSearch;

    if (isAlreadyOnTarget) {
      shouldSyncQueryRef.current = false;
      return;
    }

    // 목표 주소로 이동!
    // replace: true -> 뒤로가기 눌렀을 때 검색 입력 전으로 바로 가기 위해 현재 기록을 덮어써요.
    navigate(targetSearch, {
      replace: location.pathname === ROUTE_PATHS.SEARCH,
    });

    shouldSyncQueryRef.current = false; // 이동했으니 깃발 내리기
  }, [debouncedSearchQuery, location.pathname, location.search, navigate]);

  // --- 6. 사용자가 타자를 칠 때 실행되는 함수 ---
  const handleInputChange = (e) => {
    shouldSyncQueryRef.current = true; // "사용자가 입력 중입니다!"라고 깃발을 올려요.
    setSearchQuery(e.target.value); // 입력한 글자를 메모지에 적어요.
  };

  // --- 7. 화면에 보여지는 부분 (HTML) ---
  return (
    <div className="flex w-full items-center justify-center">
      <input
        // 디자인 (Tailwind CSS)
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-600 focus:outline-none dark:border-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
        // 타자 칠 때마다 handleInputChange 함수를 실행해요.
        onChange={handleInputChange}
        // 아무것도 없을 때 보여줄 안내 문구
        placeholder="검색어를 입력해주세요."
        // 글자 입력 모드
        type="text"
        // 이 입력창의 값은 searchQuery 메모지와 연결돼요.
        value={searchQuery}
      />
    </div>
  );
};
export default SearchBar;
