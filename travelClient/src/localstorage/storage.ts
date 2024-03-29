export const setItem = (name: string, value: string) => {
  return localStorage.setItem(name, value);
};

export const getItem = (name: string) => {
  return localStorage.getItem(name);
};

export const removeItem = (name: string) => {
  return localStorage.removeItem(name);
};
