import "./App.css";
import { NavBar } from "./Components/Nav/NavBar";
import { Routes, Route, Outlet } from "react-router-dom";
import Welcome from "./Components/Welcome/WelcomePage";

function App() {
  return (
    <Routes>
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
      </Route>
    </Routes>
  );
}

export default App;
