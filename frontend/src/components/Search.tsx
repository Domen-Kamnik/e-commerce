import { useEffect, useRef, useState } from "react";
import { SearchRecommendation } from "../types/domain/product";

function Search() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function handleClickAway(e: MouseEvent) {
    if (!searchDivRef.current?.contains(e.target as Node)) setSearchResults([]);
  }
  useEffect(() => {
    addEventListener("click", handleClickAway);
    return () => removeEventListener("click", handleClickAway);
  }, []);
  const searchDivRef = useRef<HTMLDivElement | null>(null);
  const [searchRecommendations, setSearchResults] = useState<
    SearchRecommendation[]
  >([
    { id: 1, productType: "headph" },
    { id: 2, productType: "oven" },
  ]);
  return (
    <div className="md:w-10/12 lg:w-8/12">
      <form onSubmit={handleSubmit}>
        <div className="relative" ref={searchDivRef}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products ..."
              className="w-full text-gray-900 bg-gray-100 border border-gray-300 rounded-lg p-1 pl-2 outline-transparent outline-solid outline-2 focus:outline-amber-200 transition-colors"
            />
            <button className="px-3 py-1 bg-orange-300 hover:bg-orange-400 transition-colors rounded-r-lg absolute right-0 top-1/2 -translate-y-1/2 hover:cursor-pointer">
              <i className="bi bi-search text-gray-700 text-xl"></i>
            </button>
          </div>
          {searchRecommendations.length > 0 && (
            <ul className="absolute mt-0.5 w-full border rounded-sm shadow-md">
              {searchRecommendations.map(({ id, productType }) => (
                <li
                  key={id}
                  className="p-1 text-gray-900 font-semibold bg-white hover:bg-gray-200 cursor-pointer"
                >
                  {productType}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

export default Search;
