/**
 * Safely retrieves a value from local storage.
 * @param key The key associated with the stored value.
 * @returns The parsed value or null if not found or parsing fails.
 */
export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error retrieving item from local storage: ${error}`);
    return null;
  }
}

/**
 * Safely stores a value in local storage.
 * @param key The key to associate with the value.
 * @param value The value to store.
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in local storage: ${error}`);
    // Consider handling quota exceeded errors gracefully here
  }
}

/**
 * Removes an item from local storage.
 * @param key The key of the item to remove.
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from local storage: ${error}`);
  }
}

/**
 * Clears all items from local storage.
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing local storage: ${error}`);
  }
}
