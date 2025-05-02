function Search() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="md:w-10/12 lg:w-8/12">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex">
          <input
            type="text"
            placeholder="Search products ..."
            className="flex-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg p-1 pl-2 outline-none focus:outline-solid outline-2 outline-amber-200"
          />
          <button className="px-2 bg-orange-300 rounded-r-lg hover:cursor-pointer -translate-x-8">
            <i className="bi bi-search text-gray-700 text-xl"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
