function Search() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products ..."
          className="border border-gray-300 rounded-lg p-1 outline-none"
        />
      </form>
    </div>
  );
}

export default Search;
