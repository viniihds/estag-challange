import { useEffect, useState } from "react"

export default function OrderDetails({code}){
    const [items, setItems] = useState([])
   
    async function handleOrderDetails(){
        const response = fetch(`http://localhost/routes/orders.php?code=${code}`).then(res => {
            return res.json()
        }) 
        const data = await response
        setItems(data)
        
    }

    useEffect(() => {
        handleOrderDetails() 
    }, [code])

    return(
        <div>
                {
                    items.length != 0 && 
                    items.products.map((product) => (
                        <div className="divitems" key={product.code}>
                            <div>Code: {product.product_code}</div>
                            <div>Name: {product.name}</div>
                            <div>Amount: {product.amount}</div>
                            <div>Price: ${product.price}</div>
                            <div>Tax: {product.tax}%</div>
                        </div>
                    ))
                }
            
        </div>
                            
    )
}