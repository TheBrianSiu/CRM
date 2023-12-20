export const totalPages = (len, itemsPerPage) => {
  console.log(len);
  return Math.ceil(len / itemsPerPage);
};

export const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

export const handleNextPage = () => {
  // const totalPages = Math.ceil(filteredUserdata.length / itemsPerPage);
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

export const switchPage = (
  direction,
  currentPage,
  totalPages,
  setCurrentPage,
) => {
  if (direction === 'prev' && currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  } else if (direction === 'next' && currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};
