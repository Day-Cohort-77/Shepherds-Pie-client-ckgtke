import { useEffect, useState } from "react"
import { getAllCheese, getAllSize, getAllToppings, getAllSauce } from "../../Services/PizzaOptionsService"

export const OrderForm = () => {

    const [allSize, setAllSize] = useState([]) ///renders page each time
    const [allSauce, setAllSauce] = useState([])
    const [allCheese, setAllCheese] = useState([])
    const [allTopping, setAllToppings] = useState([])

    useEffect(() => {
        getAllSize().then((sizeArray) => { setAllSize(sizeArray) })
    }, [])

    useEffect(() => {
        getAllSauce().then((sauceArray) => { setAllSauce(sauceArray) })
    }, [])

    useEffect(() => {
        getAllCheese().then((cheeseArray) => { setAllCheese(cheeseArray) })
    }, [])

    useEffect(() => {
        getAllToppings().then((toppingsArray) => { setAllToppings(toppingsArray) })
    }, [])

    return (
        <>
            <div className="size-options">
                <div>Size:</div>
                <select>
                    <option value="0">Select a Size:</option>
                    {allSize.map((size) => {
                        return (
                            <option key={size.id}>{size.name}</option>
                        )
                    })}
                </select>
            </div>




            <div className="sauce-options">
                <div>Sauce:</div>
                <select>
                    <option value="0">Select a Sauce:</option>
                    {allSauce.map((sauce) => {
                        return (
                            <option key={sauce.id}>{sauce.name}</option>
                        )
                    })}
                </select>
            </div>



            <div className="cheese-options">
                <div>Cheese:</div>
                <select>
                    <option value="0">Select a Cheese:</option>
                    {allCheese.map((cheese) => {
                        return (
                            <option key={cheese.id}>{cheese.name}</option>
                        )
                    })}
                </select>
            </div>
        
        <div className="topping-options">
            <div>Toppings:</div>
            {allTopping.map((top) => {
                return (<label key={top.id}><input type="checkbox" />{top.name}</label>
                )})}
    
            

        </div>
        
        
                </>
            )
        }
