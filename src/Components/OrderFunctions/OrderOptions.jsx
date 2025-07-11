import { useEffect, useState } from "react";
import {
  getAllCheese,
  getAllSize,
  getAllToppings,
  getAllSauce,
} from "../../Services/PizzaOptionsService";
import { PizzaOrderPost } from "../../Services/pizzaOrderPost";

export const OrderForm = () => {
  const [allSize, setAllSize] = useState([]); ///renders page each time
  const [allSauce, setAllSauce] = useState([]);
  const [allCheese, setAllCheese] = useState([]);
  const [allTopping, setAllToppings] = useState([]);
  const [chosenSize, setChosenSize] = useState("");
  const [chosenSauce, setChosenSauce] = useState("");
  const [chosenCheese, setChosenCheese] = useState("");

  useEffect(() => {
    getAllSize().then((sizeArray) => {
      setAllSize(sizeArray);
    });
  }, []);

  useEffect(() => {
    getAllSauce().then((sauceArray) => {
      setAllSauce(sauceArray);
    });
  }, []);

  useEffect(() => {
    getAllCheese().then((cheeseArray) => {
      setAllCheese(cheeseArray);
    });
  }, []);

  useEffect(() => {
    getAllToppings().then((toppingsArray) => {
      setAllToppings(toppingsArray);
    });
  }, []);

  return (
    <>
      <div className="size-options">
        <div>Size:</div>
        <select onChange={(event) => setChosenSize(event.target.value)}>
          <option value="0">Select a Size:</option>
          {allSize.map((size) => {
            return (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="sauce-options">
        <div>Sauce:</div>
        <select onChange={(event) => setChosenSauce(event.target.value)}>
          <option value="0">Select a Sauce:</option>
          {allSauce.map((sauce) => {
            return (
              <option key={sauce.id} value={sauce.id}>
                {sauce.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="cheese-options">
        <div>Cheese:</div>
        <select onChange={(event) => setChosenCheese(event.target.value)}>
          <option value="0">Select a Cheese:</option>
          {allCheese.map((cheese) => {
            return (
              <option key={cheese.id} value={cheese.id}>
                {cheese.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="topping-options">
        <div>Toppings:</div>
        {allTopping.map((top) => {
          return (
            <label key={top.id}>
              <input type="checkbox" />
              {top.name}
            </label>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => {
            PizzaOrderPost({
              cheeseId: parseInt(chosenCheese),
              sauceId: parseInt(chosenSauce),
              sizeId: parseInt(chosenSize),
            });
          }}
        >
          Place Order
        </button>
      </div>
    </>
  );
};
