export const PizzaOrderPost = (order) => {
  fetch("http://localhost:8088/pizzas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(order),
  });
};
