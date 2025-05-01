import Search from "./Search";

function Navbar() {
  return (
    <nav className="relative flex p-4 bg-gray-900">
      <ul className="flex flex-col w-full font-sans text-lg text-gray-200 sm:flex-row">
        <li className="w-2/12">Hero</li>
        <li className="w-5/12">
          <Search />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
