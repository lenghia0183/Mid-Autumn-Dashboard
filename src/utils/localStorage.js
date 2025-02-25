export const getLocalStorageItem = (itemName) => {
  try {
    const item = JSON.parse(localStorage.getItem(itemName));
    return item;
  } catch (error) {
    return null;
  }
};

export const setLocalStorageItem = (itemName, value) => {
  try {
    localStorage.setItem(itemName, JSON.stringify(value));
  } catch (error) {}
};

export const removeLocalStorageItem = (itemName) => {
  try {
    localStorage.removeItem(itemName);
  } catch (error) {}
};
