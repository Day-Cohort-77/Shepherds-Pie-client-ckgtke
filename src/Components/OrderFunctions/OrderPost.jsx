export const OrderPost = (order) => {
  return fetch("http://localhost:8088/orderItems", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(order),
  });
};