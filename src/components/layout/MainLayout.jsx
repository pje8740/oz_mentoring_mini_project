import { Header } from "@components";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
