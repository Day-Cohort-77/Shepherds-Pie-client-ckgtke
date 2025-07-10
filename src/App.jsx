import "./App.css";
import { NavBar } from "./Components/Nav/NavBar.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import { WelcomePage } from "./Components/Welcome/WelcomePage.jsx";
import { OrderForm } from "./Components/OrderFunctions/OrderOptions.jsx"


export const App = () => {
  return <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
         <Route index element={<WelcomePage />} />  
         <Route path="order" element={<OrderForm />} />
         
      </Route>
    </Routes>
}


