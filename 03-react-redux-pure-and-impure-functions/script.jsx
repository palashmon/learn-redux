/**
 * Pure functions are those whose return values depend only upon the values of their arguments.
 */
function square(x) {
  return x * x;
}
function squareAll(items) {
  return items.map(square);
}

/**
 * Impure functions where a database is called, and values passed in are being overwritten.
 */
function square(x) {
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
