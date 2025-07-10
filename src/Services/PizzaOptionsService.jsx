export const getAllSize = () => {
    return fetch(`http://localhost:8088/size`).then((res) => res.json())
}

export const getAllCheese = () => {
    return fetch(`http://localhost:8088/cheeseOptions`).then((res) => res.json())
}

export const getAllSauce = () => {
    return fetch(`http://localhost:8088/sauceOptions `).then((res) => res.json())
}

export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then((res) => res.json())
}

