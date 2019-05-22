"use strict";

function sortMatchesDescending(arr) {
  return arr.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    else return -1;
  });
}

module.exports = {
  sortMatchesDescending
};
