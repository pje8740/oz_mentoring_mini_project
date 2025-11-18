import { SearchBar } from "@components/index";
import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <h1>
            <Link>SCARECROW MOVIE</Link>
          </h1>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>right side</div>
      </div>
    </header>
  );
};
export default Header;
