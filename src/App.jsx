import { MainLayout } from "@components";
import { ROUTE_PATHS } from "@constants";
import ThemeProvider from "@contexts/ThemeProvider";
import { Detail, Home, Login, NotFound, Search, SignUp } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  const ROUTES = [
    {
      element: <Home />,
      path: ROUTE_PATHS.HOME,
    },
    {
      element: <Detail />,
      path: ROUTE_PATHS.DETAIL,
    },
    {
      element: <Search />,
      path: ROUTE_PATHS.SEARCH,
    },
    {
      element: <NotFound />,
      path: ROUTE_PATHS.NOT_FOUND,
    },
    {
      element: <Login />,
      path: ROUTE_PATHS.LOGIN,
    },
    {
      element: <SignUp />,
      path: ROUTE_PATHS.SIGNUP,
    },
  ];

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {ROUTES.map((route) => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
