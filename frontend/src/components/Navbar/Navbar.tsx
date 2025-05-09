import Search from "../Search";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useUser } from "../../context/UserProvider";
import UserDropdown from "./UserDropdown";

function Navbar() {
  const { user } = useUser();

  return (
    <nav className="relative flex p-2 bg-gray-900">
      <ul className="flex flex-col w-full font-sans text-lg text-gray-200 gap-2 sm:flex-row sm:items-center sm:gap-6">
        <li className="">
          <Link to={"/"}>
            <img
              src={logo}
              alt=""
              className="h-14 rounded-sm hover:cursor-pointer"
            />
          </Link>
        </li>
        <li className="flex-1">
          <Search />
        </li>
        <li>
          <Link
            to={"/cart"}
            className="flex items-center gap-1 hover:text-gray-400 transition-colors"
          >
            <i className="bi bi-cart text-3xl"></i> <div>Cart</div>
          </Link>
        </li>
        {!user && (
          <li>
            <Link
              to={"/login"}
              className="hover:text-gray-400 transition-colors"
            >
              Sign in
            </Link>
          </li>
        )}
        {user && <UserDropdown />}
      </ul>
    </nav>
  );
}

export default Navbar;
