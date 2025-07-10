import "./App.css";
import { NavBar } from "./Components/Nav/NavBar";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
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
         <Route index element={<Welcome />} /> 
        <Route path="/tickets" element={<TicketList />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route> 
      </Route>
    </Routes>
}

export default App;
