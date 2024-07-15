type StorageParams = {
  token: string;
  id: string;
};
export const getStorage = (key: keyof StorageParams) => {
  const value = localStorage.getItem(key);
  try {
    if (value) return value === null ? null : JSON.parse(value);
  } catch (err) {
    return value;
  }
};
export const saveStorage = <K extends keyof StorageParams>(key: K, value: StorageParams[K]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeStorage = <K extends keyof StorageParams>(key: K) => {
  localStorage.removeItem(key);
};
