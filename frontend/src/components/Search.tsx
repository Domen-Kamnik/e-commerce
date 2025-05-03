function Search() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="md:w-10/12 lg:w-8/12">
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default Search;
