import Fuse from 'fuse.js';

// Function to perform a search using Fuse.js
export function performSearch(data, searchQuery, setSearchQuery) {
  const options = {
    keys: [
      'taskname',
      'assignees.firstName',
      'assignees.lastName',
      'description',
      'estValue',
      'leadStatus',
      'priority',
    ],
    threshold: 0.3,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(data, options);

  return searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : data;
}
