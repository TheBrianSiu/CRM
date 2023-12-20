export function pagination({
  currentPage,
  filteredUserdataLength,
  itemsPerPage,
  setCurrentPage,
  handlePrevPage,
  handleNextPage,
  indexOfLastItem,
}) {
  const totalPages = Math.ceil(filteredUserdataLength / itemsPerPage);
  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            onClick={handlePrevPage}
            className={`ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 ? 'pointer-events-none' : ''
            }`}
          >
            Previous
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={() => setCurrentPage(index + 1)}
              className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === index + 1
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : ''
              }`}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={handleNextPage}
            className={`flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              indexOfLastItem >= filteredUserdataLength
                ? 'pointer-events-none'
                : ''
            }`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default pagination;
