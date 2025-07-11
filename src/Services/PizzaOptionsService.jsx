// Get all pizza sizes
export const getAllSize = () => {
  return fetch("http://localhost:8088/sizes").then(res => res.json());
};

// Get all cheese options
export const getAllCheese = () => {
  return fetch("http://localhost:8088/cheeses").then(res => res.json());
};

// Get all sauce options
export const getAllSauce = () => {
  return fetch("http://localhost:8088/sauces").then(res => res.json());
};

// Get all topping options
export const getAllToppings = () => {
  return fetch("http://localhost:8088/toppings").then(res => res.json());
};

// Get all employees
export const getAllEmployees = () => {
  return fetch("http://localhost:8088/Employees").then(res => res.json());
};

// Get all employee roles
export const getAllEmployeeRoles = () => {
  return fetch("http://localhost:8088/employeesRole").then(res => res.json());
};