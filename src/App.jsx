import MainLayout from "@components/Layout/MainLayout";
import { Detail } from "@pages/Detail";
import { Home } from "@pages/Home";
import { NotFound } from "@pages/NotFound";
import { Route, Routes } from "react-router";

function App() {
  const ROUTES = [
    {
      element: <Home />,
      path: "/",
    },
     {
      element: <Detail />,
      path: "/detail/:id",
    },
     {
      element: <NotFound />,
      path: "*",
    },
  ];

  return (
    <Routes>
      <Route element={<MainLayout />}>
      {ROUTES.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
      </Route>
    </Routes>
  )
}

export default App;
