import { Header } from "@components";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
