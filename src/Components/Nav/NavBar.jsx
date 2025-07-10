import "./NavBar.css"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (<ul className="navbar">
      <li className="navbar-item">
        <Link to="home">Home</Link>
      </li>
       <li className="navbar-item">
        <Link to="order">Order</Link>
      </li>
       {/* <li className="navbar-item">
        <Link to=""></Link>
      </li>
       <li className="navbar-item">
        <Link to=""></Link> */}
      {/* </li> */}
    </ul>)
}