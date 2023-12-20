export function Navbar({
  adduser,
  searchQuery,
  handleSearch,
  Istheme,
  setIstheme,
}) {
  return (
    <div className="grid grid-cols-12 sm:grid-cols-2 md:grid-cols-3">
      <div
        className="col-span-4 ml-5 inline-flex rounded-md shadow-sm "
        role="group"
      >
        <button
          type="button"
          className={`${
            Istheme === 'All' && 'border-b border-black'
          } round-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-900 `}
          onClick={() => setIstheme('All')}
        >
          All
        </button>
        <button
          type="button"
          className={`${
            Istheme === 'Board' && 'border-b border-black'
          } round-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-900`}
          onClick={() => setIstheme('Board')}
        >
          Board
        </button>
        <button
          type="button"
          className="round-lg border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 hover:text-white focus:z-10 focus:bg-gray-300 focus:text-white"
          onClick={adduser}
        >
          Add
        </button>
      </div>
      <div className="round-md bg-100 col-start-6 inline-flex items-center">
        <div className="col-span-5 mr-5 flex items-center">
          <input
            className="px-4 py-2 text-sm font-medium text-gray-400 outline-none"
            type="text"
            placeholder="Search ..."
            required
            value={searchQuery === null ? '' : searchQuery}
            onChange={handleSearch}
          />
          <button className="round-lg border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-500 hover:text-white focus:z-10 focus:bg-blue-900 focus:text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
