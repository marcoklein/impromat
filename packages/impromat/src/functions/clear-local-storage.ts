/**
 * Removes all items from the local storage that have a key starting with the given prefix.
 *
 * @param prefix - The prefix to filter the local storage keys.
 */
export function clearLocalStorageWithPrefix(prefix: string) {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => localStorage.removeItem(key));
}
