export const getAllSize = () => {
  return fetch(`http://localhost:8088/sizes`).then((res) => res.json());
};

export const getAllCheese = () => {
  return fetch(`http://localhost:8088/cheeses`).then((res) => res.json());
};

export const getAllSauce = () => {
  return fetch(`http://localhost:8088/sauces`).then((res) => res.json());
};

export const getAllToppings = () => {
  return fetch(`http://localhost:8088/toppings`).then((res) => res.json());
};
