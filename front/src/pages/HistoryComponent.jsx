import { useState, useEffect } from "react"
import "../assets/style.css"
const urlOrders = "http://localhost/routes/orders.php"
function HistoryComponent(){
    const [orders, setOrders] = useState([])
    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch(urlOrders)
            const data = await res.json()
            setOrders(data);
            console.log(data)
        }
        fetchOrders()
    }, []);
    return(
        <div>
            <div className="main">
                <div className="gridArea2" style={{border: "none"}}>
                        {orders.map((order) => (
                            <div className="divitems" key={order.code}>
                                <div>Code: {order.code}</div>
                                <div>Tax: ${order.tax}</div>
                                <div>Total: ${order.total}</div>
                                <div><button className="btnalternative">Details</button></div>
                            </div>
                        ))}
                    </div> 
                <div className="gridArea2">
                    <table>
                        <thead>
                            <td className="tablemainitem">Product</td>
                            <td>Unit price</td>
                            <td>Product Tax</td>
                            <td>Amount</td>
                            <td>Total</td>
                        </thead>
                        <tbody id="sale-details">
                        </tbody>
                    </table>
                    <div id="sale-details" className="prices">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HistoryComponent