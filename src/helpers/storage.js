export const Storage = {
  getStorage(name = "products") {
    return JSON.parse(localStorage.getItem(name));
  },
  setStorage(value) {
    localStorage.setItem("products", JSON.stringify(value));
  },
};
