import { useState, useEffect } from "react"
import "../assets/style.css"
import  OrderDetails  from "../components/OrderDetails"
import NavComponent from "../components/NavComponent"
function HistoryComponent(){
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(0)


    const {code} = JSON.parse(localStorage.getItem("users"))
  

    const urlOrders = `http://localhost/routes/orders.php?user_code=${code}`
    async function fetchOrders() {
        const res = await fetch(urlOrders)
        const data = await res.json()
        setOrders(data);
        setSelectedOrder(data[0].code)
    }
    console.log(orders)
    useEffect(() => {
        fetchOrders()
    }, []);
    return(
        <div>
            <NavComponent />
            <div className="main">
                <div className="gridArea2" style={{border: "none"}}>
                        {orders.map((order) => (
                            <div className="divitems" key={order.code}>
                                <div>Code: {order.code}</div>
                                <div>Tax: ${order.tax}</div>
                                <div>Total: ${order.total}</div>
                                <div><button onClick={() => setSelectedOrder(order.code)} {...window.scrollTo({top: 0, behavior:'smooth'})} className="btnalternative">Details</button></div>
                            </div >
                        ))}
                    </div>
                    {
                        selectedOrder != 0 &&
                        <div className="gridArea2">
                            <OrderDetails code={selectedOrder} />
                        </div>
                    }
            </div>
        </div>
    )
}
export default HistoryComponent