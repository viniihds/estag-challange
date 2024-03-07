import "../assets/style.css"
import { Link } from "react-router-dom"
function NavComponent() {
    return (
        <div>
            <nav className="nav">
        <ul className="ul_nav">
            <li className="title">
                Suite Store
            </li>
            <li className="links_nav">
                <Link className="links" to="/products">Products</Link>
            </li>
            <li className="links_nav">
                <Link className="links" to="/categories">Categories</Link>
            </li>
            <li className="links_nav">
                History
            </li>
        </ul>
    </nav>
        </div>
    )
}
export default NavComponent