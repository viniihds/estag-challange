import "../assets/style.css"
import { useState, useEffect } from "react"
const urlProducts = "http://localhost/routes/products.php"
const urlOrders = "http://localhost/routes/orders.php"
function IndexComponent() {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [amount, setAmount] = useState([])
    const [price, setPrice] = useState([])
    const [tax, setTax] = useState([])
    const [carts, setCarts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(urlProducts)
            const data = await res.json()
            setProducts(data);
        }
        fetchProducts()
    }, []);
    async function changeValues() {
        const res = await fetch(urlProducts)
        const data = await res.json()
        const products = data
        const prod = product
        const selectedProduct = products.find((p) => p.code == prod)
        if (selectedProduct) {
            setPrice(selectedProduct.price)
            setTax(selectedProduct.tax_category)
        }
    }
    async function addToCart(e) {
        e.preventDefault()
        const res = await fetch(urlProducts)
        const data = await res.json()
        const products = data
        const prod = product
        const selectedProduct = products.find((p) => p.code == prod)
        setCarts((previousItems) => [...previousItems, { code: selectedProduct.code, name: selectedProduct.name, tax: selectedProduct.tax_category, amount: amount, price: selectedProduct.price }])
    }
    function deleteItem(index){
        setCarts(carts.splice(index,1))
    }
    function cancelCart(){
        setCarts(carts.splice(0, 0))
    }

    function finishCart(){
        const newCart = carts.map(item => {
            return {
                amount : item.amount,
                code : item.code
            }
        })
        try{
            const res = fetch(urlOrders,{
                    method: 'POST',
                    body: JSON.stringify(newCart)
                },
            )
            cancelCart()
        } catch(error){
            console.log(error.message)
        }
    }


    changeValues()

    return (
        <div>
            <div className="main">
                <div className="gridArea1">
                    <form id="product-form">
                        <select value={product} onChange={(e) => setProduct(e.target.value)} className="mainselect" id="input-product-category" name="products">
                            <option value={0} disabled>Product</option>
                            {products.map((product) => (
                                <option key={product.code} value={product.code}>{product.name}</option>
                            ))}
                        </select>

                        <div className="secondaryselects">
                            <label htmlFor="name"></label>
                            <input id="product-name-input" value={amount} onChange={(e) => setAmount(e.target.value)} name="name" className="secondaryselect1" type="number" min={0} placeholder="Amount" />
                            <label htmlFor="tax"></label>
                            <input id="product-price-input" value={price} onChange={() => setPrice()} name="tax" className="secondaryselect2" style={{ marginLeft: "10px" }} type="float" min={0} placeholder="Price" disabled />
                            <label htmlFor="tax"></label>
                            <input id="product-amount-input" value={tax} onChange={() => setTax()} name="tax" className="secondaryselect2" style={{ marginLeft: "10px" }} type="number" placeholder="Tax" disabled />
                        </div>
                        <div>
                            <input onClick={addToCart} type="submit" className="btngridArea1" value={"Add Product"} />
                        </div>
                    </form>
                </div>
                <div className="gridArea2">
                    {carts.map((cart) => (
                            <div className="divitems" key={cart.index}>
                                <div>{cart.name}</div>
                                <div>Price: ${cart.price}</div>
                                <div>Amount: {cart.amount}</div>
                                <div>Tax: {cart.tax}%</div>
                                <div>Total: ${cart.price * cart.amount + (cart.price * cart.amount * (cart.tax / 100))}</div>
                                <div><button onClick={deleteItem} className="btnalternative">Delete</button></div>
                            </div>
                    ))}
                </div>
                <div className="finishsale">
                    <div>
                        <div className="buttons">
                            <button id="btn-cancel-cart" onClick={cancelCart} className="btncancel">Cancel</button>
                            <button id="btn-finish-cart" onClick={finishCart} className="btnfinish" >Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IndexComponent