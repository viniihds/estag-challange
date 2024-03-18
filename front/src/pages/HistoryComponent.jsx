import { useState, useEffect } from "react"
import "../assets/style.css"
import  OrderDetails  from "../components/OrderDetails"
import OrdersComponent from "../components/OrdersComponent"
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
                            <OrdersComponent orderCode={order.code} orderTax={order.tax} orderTotal={order.total} setSelectedOrder={setSelectedOrder}/>
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