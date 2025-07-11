export const PizzaSummary = ({ pizza, sizes, sauces, cheeses, toppings }) => {
  // Helper to get a name from an array by id
  const getName = (arr, id) => arr.find(item => item.id === id)?.name || "Unknown";

  return (
    <div>
      <div><strong>Size:</strong> {getName(sizes, pizza.sizeId)}</div>
      <div><strong>Sauce:</strong> {getName(sauces, pizza.sauceId)}</div>
      <div><strong>Cheese:</strong> {getName(cheeses, pizza.cheeseId)}</div>
      <div>
        <strong>Toppings:</strong>{" "}
        {pizza.toppingIds.map(tid => getName(toppings, tid)).join(", ")}
      </div>
    </div>
  );
};