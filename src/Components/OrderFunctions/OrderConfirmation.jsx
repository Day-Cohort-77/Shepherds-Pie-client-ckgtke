import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllCheese,
  getAllSize,
  getAllToppings,
  getAllSauce,
  getAllEmployees,
} from "../../Services/PizzaOptionsService";
import { PizzaSummary } from "./PizzaSummary";

export const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  // State for lookup data
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Load all lookup data
  useEffect(() => {
    getAllSize().then(setSizes);
    getAllCheese().then(setCheeses);
    getAllSauce().then(setSauces);
    getAllToppings().then(setToppings);
    getAllEmployees().then(setEmployees);
  }, []);

  // Helper to get a name from an array by id
  const getName = (arr, id) => arr.find(item => item.id === id)?.name || "Unknown";


  const getPizzasTotal = (order) => {
  if (!order || !order.pizzas) return 0;
  return order.pizzas.reduce((sum, pizza) => {
    // Find size cost
    const size = sizes.find(s => s.id === pizza.sizeId);
    const base = size ? size.cost : 0;
    // Find toppings cost
    const toppingTotal = pizza.toppingIds
      .map(tid => {
        const topping = toppings.find(t => t.id === tid);
        return topping ? topping.cost : 0;
      })
      .reduce((sum, cost) => sum + cost, 0);
    return sum + base + toppingTotal;
  }, 0);
};

const getOrderTotal = (order) => {
  let total = order.total || 0;
  if (order.tip) {
    if (!order.total || order.total < order.tip) {
      total += order.tip;
    }
  }
  return total;
};


  return (
    <div>
      <h2>Order Placed</h2>
      <p>Your order has been placed successfully!</p>
      {order && (
        <div>
            <div><strong>Pizzas Total:</strong> ${getPizzasTotal(order).toFixed(2)}</div>
<div><strong>Tip:</strong> ${order.tip?.toFixed(2) || "0.00"}</div>
{order.orderType === "delivery" && (
  <div>
    <strong>Delivery Surcharge:</strong> $5.00
  </div>
)}
<div><strong>Total:</strong> ${getOrderTotal(order).toFixed(2)}</div>          <div><strong>Order Type:</strong> {order.orderType}</div>
          <div><strong>Order Taker:</strong> {getName(employees, order.orderTakerId)}</div>
          {order.orderType === "delivery" && (
            <div><strong>Delivery Driver:</strong> {getName(employees, order.deliveryDriverId)}</div>
          )}
          <div><strong>Timestamp:</strong> {order.timestamp}</div>
          <h3>Pizzas:</h3>
          <ol>
            {order.pizzas.map((pizza, idx) => (
              <li key={idx}>
                <PizzaSummary
                  pizza={pizza}
                  sizes={sizes}
                  sauces={sauces}
                  cheeses={cheeses}
                  toppings={toppings}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};