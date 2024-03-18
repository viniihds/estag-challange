import ButtonComponent from "./ButtonComponent"

function OrdersComponent({orderCode, orderTax, orderTotal, setSelectedOrder}) {
    return (
        <div className="divitems" key={orderCode}>
            <div>Code: {orderCode}</div>
            <div>Tax: ${orderTax}</div>
            <div>Total: ${orderTotal}</div>
            <ButtonComponent styleclass={"btnalternative"} btnFunction={setSelectedOrder} itemCode={orderCode} text={"Details"} {...window.scrollTo({ top: 0, behavior: 'smooth' })} /> 
        </div >
    )
}
export default OrdersComponent