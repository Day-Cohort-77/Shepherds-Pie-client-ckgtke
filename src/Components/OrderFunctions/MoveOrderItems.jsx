export const moveOrderItemsToOrders = async () => {
  const response = await fetch("http://localhost:8088/orderItems");
  const orderItems = await response.json();

  if (orderItems.length === 0) return;

  for (const item of orderItems) {
    const { id, ...orderData } = item;
    await fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderData),
    });
    await fetch(`http://localhost:8088/orderItems/${id}`, {
      method: "DELETE",
    });
  }
};