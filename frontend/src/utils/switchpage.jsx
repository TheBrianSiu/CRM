export const SwitchPage = (
  direction,
  currentPage,
  totalPages,
  setCurrentPage,
) => {
  if (direction === "prev" && currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  } else if (direction === "next" && currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};
