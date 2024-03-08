import "../assets/style.css"
import { Link } from "react-router-dom"
function NavComponent() {
    return (
        <div>
            <nav className="nav">
                <ul className="ul_nav">
                    <li className="title">
                        <Link className="links" to="/">Suite Store</Link>
                    </li>
                    <li className="links_nav">
                        <Link className="links" to="/products">Products</Link>
                    </li>
                    <li className="links_nav">
                        <Link className="links" to="/categories">Categories</Link>
                    </li>
                    <li className="links_nav">
                        <Link className="links" to="/history">History</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default NavComponent