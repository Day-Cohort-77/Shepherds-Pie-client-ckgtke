import { useEffect, useState } from "react";
import {
  getAllCheese,
  getAllSize,
  getAllToppings,
  getAllSauce,
  getAllEmployees,
  getAllEmployeeRoles,
} from "../../Services/PizzaOptionsService";
import { TipInput } from "./TipInput";
import { OrderPost } from "./OrderPost";
import { moveOrderItemsToOrders } from "./MoveOrderItems";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
  // Dropdown options
  const [sizes, setSizes] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);



  // User selections
  const [chosenSize, setChosenSize] = useState("");
  const [chosenSauce, setChosenSauce] = useState("");
  const [chosenCheese, setChosenCheese] = useState("");
  const [chosenToppings, setChosenToppings] = useState([]);
  const [orderType, setOrderType] = useState("");
  const [orderTakerId, setOrderTakerId] = useState("");
  const [deliveryDriverId, setDeliveryDriverId] = useState("");
  const [pizzas, setPizzas] = useState([]);
const [tip, setTip] = useState(""); 


  const navigate = useNavigate();

  // Load all dropdown options
  useEffect(() => {
    getAllSize().then(setSizes);
    getAllSauce().then(setSauces);
    getAllCheese().then(setCheeses);
    getAllToppings().then(setToppings);
    getAllEmployees().then(setEmployees);
    getAllEmployeeRoles().then(setEmployeeRoles);
  }, []);

  // Find only employees who are delivery drivers
  const deliveryDrivers = employees.filter(emp =>
    employeeRoles.find(role => role.employeesId === emp.id && role.deliveryDriver)
  );

  // Handle toppings checkbox
  const handleToppingChange = (id) => {
    setChosenToppings((prev) =>
      prev.includes(id)
        ? prev.filter((tid) => tid !== id)
        : [...prev, id]
    );
  };

  // Add pizza to list
  const handleAddPizza = () => {
    if (chosenSize && chosenSauce && chosenCheese) {
      setPizzas([
        ...pizzas,
        {
          cheeseId: parseInt(chosenCheese),
          sauceId: parseInt(chosenSauce),
          sizeId: parseInt(chosenSize),
          toppingIds: [...chosenToppings],
        },
      ]);
      setChosenSize("");
      setChosenSauce("");
      setChosenCheese("");
      setChosenToppings([]);
    }
  };

  // Calculate pizza and order total
  const DELIVERY_SURCHARGE = 5;
  const calculatePizzaPrice = (pizza) => {
    const size = sizes.find(s => s.id === pizza.sizeId);
    const base = size ? size.cost : 0;
    const toppingTotal = pizza.toppingIds
      .map(tid => {
        const topping = toppings.find(t => t.id === tid);
        return topping ? topping.cost : 0;
      })
      .reduce((sum, cost) => sum + cost, 0);
    return base + toppingTotal;
  };
  const calculateOrderTotal = () => {
  let total = pizzas.reduce((sum, pizza) => sum + calculatePizzaPrice(pizza), 0);
  if (orderType === "delivery") total += DELIVERY_SURCHARGE;
  const tipValue = parseFloat(tip) || 0;
  total += tipValue;
  return total;
};
  // Place order
  const handlePlaceOrder = async () => {
    if (
      pizzas.length === 0 ||
      !orderTakerId ||
      (orderType === "delivery" && !deliveryDriverId)
    ) return;

    const total = calculateOrderTotal();
    const tipValue = parseFloat(tip) || 0;
const order = {
  pizzas,
  orderType,
  total,
  tip: tipValue, // include tip
  timestamp: new Date().toISOString(),
  orderTakerId: parseInt(orderTakerId),
  deliveryDriverId: orderType === "delivery" ? parseInt(deliveryDriverId) : null
};
    await OrderPost(order);
    setPizzas([]);
    await moveOrderItemsToOrders();
    navigate("/order/confirmation", { state: { order } });
  };

  return (
    <div>
      <h2>Create Your Order</h2>
      <div>
        <label>Size:</label>
        <select value={chosenSize} onChange={e => setChosenSize(e.target.value)}>
          <option value="">Select a Size</option>
          {sizes.map(size => (
            <option key={size.id} value={size.id}>{size.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Sauce:</label>
        <select value={chosenSauce} onChange={e => setChosenSauce(e.target.value)}>
          <option value="">Select a Sauce</option>
          {sauces.map(sauce => (
            <option key={sauce.id} value={sauce.id}>{sauce.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Cheese:</label>
        <select value={chosenCheese} onChange={e => setChosenCheese(e.target.value)}>
          <option value="">Select a Cheese</option>
          {cheeses.map(cheese => (
            <option key={cheese.id} value={cheese.id}>{cheese.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Toppings:</label>
        {toppings.map(top => (
          <label key={top.id} style={{ marginRight: "1em" }}>
            <input
              type="checkbox"
              checked={chosenToppings.includes(top.id)}
              onChange={() => handleToppingChange(top.id)}
            />
            {top.name}
          </label>
        ))}
      </div>
      <button onClick={handleAddPizza}>Add Pizza</button>
      <div>
        <button
          type="button"
          onClick={() => setOrderType("delivery")}
          style={{ background: orderType === "delivery" ? "#bde0fe" : "" }}
        >
          Delivery
        </button>
        <button
          type="button"
          onClick={() => setOrderType("pickup")}
          style={{ background: orderType === "pickup" ? "#bde0fe" : "" }}
        >
          Pick-Up
        </button>
      </div>
      <div>
        <label>Order Taken By:</label>
        <select value={orderTakerId} onChange={e => setOrderTakerId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Delivery Driver:</label>
        <select
          value={deliveryDriverId}
          onChange={e => setDeliveryDriverId(e.target.value)}
          disabled={orderType !== "delivery"}
        >
          <option value="">Select Driver</option>
          {deliveryDrivers.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>
      <h3>Pizzas in Order:</h3>
      <ul>
        {pizzas.map((pizza, idx) => (
          <li key={idx}>
            Size: {sizes.find(s => s.id === pizza.sizeId)?.name}, 
            Sauce: {sauces.find(s => s.id === pizza.sauceId)?.name}, 
            Cheese: {cheeses.find(c => c.id === pizza.cheeseId)?.name}, 
            Toppings: {pizza.toppingIds.map(tid => toppings.find(t => t.id === tid)?.name).join(", ")}
          </li>
        ))}
      </ul>
      <TipInput tip={tip} setTip={setTip} />
      {orderType === "delivery" && (
  <div>
    <strong>Delivery Surcharge:</strong> $5.00
  </div>
)}
      <div>
        <strong>Total: ${calculateOrderTotal().toFixed(2)}</strong>
      </div>
      <button onClick={handlePlaceOrder} disabled={pizzas.length === 0}>
        Place Order
      </button>
    </div>
  );
};