"use strict";

function sortMatchesDescending(arr) {
  return arr.sort((a, b) => {
    if (b.updatedAt > a.updatedAt) return 1;
    else return -1;
  });
}

module.exports = {
  sortMatchesDescending
};
