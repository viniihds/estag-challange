import "../assets/style.css"
import { useState, useEffect } from "react"
import NavComponent from "../components/NavComponent"
import ButtonComponent from "../components/ButtonComponent"
let urlProducts = "http://localhost/routes/products.php"
let urlOrders = "http://localhost/routes/orders.php"
function IndexComponent() {
    let [products, setProducts] = useState([])
    let [product, setProduct] = useState(0)
    let [amount, setAmount] = useState([])
    let [price, setPrice] = useState([])
    let [tax, setTax] = useState([]) 
    let [carts, setCarts] = useState([])
    let total = 0
    let totaltax = 0

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

    function deleteItem(index){
        const cartList = loadCart()
        cartList.splice(index,1)
        localStorage.setItem("carts", JSON.stringify(cartList))
        setCarts(JSON.parse(localStorage.getItem("carts")))
    }
    
    function cancelCart(){
        const cartList = loadCart()
        cartList.splice(0)
        localStorage.setItem("carts", JSON.stringify(cartList))
        setCarts(JSON.parse(localStorage.getItem("carts")))
    }
    
    function loadUser(){
        const user = JSON.parse(localStorage.getItem("users"))
        return user
    }

    function finishCart(e){
        e.preventDefault()
        const {code} = loadUser()
        const newCart = carts.map(item => {
            return {
                amount : parseInt(item.amount),
                code : item.product.code,
            }
        })
        const data = {
            user_code: code,
            products: newCart
        }
        console.log(data)
        try{
            const res = fetch(urlOrders,{
                    method: 'POST',
                    body: JSON.stringify(data)
                },
            )
            cancelCart()
            // window.location.reload()
        } catch(error){
            console.log(error.message)
        }
    }
        function totalPrices(){
            carts.forEach(cart => {
                total += Math.round((cart.product.price * cart.amount + (cart.product.price * cart.amount * (cart.product.tax_category / 100)))*100)/100
                totaltax += Math.round((cart.product.price * cart.amount * (cart.product.tax_category / 100))*100)/100
            });
        }
            function loadCart() {
                let dataCart = JSON.parse(localStorage.getItem('carts')) || []
                return(dataCart)
            }
            loadCart()
        async function addProductToCart(e){
            const cartList = loadCart()
            e.preventDefault()
            const prods = products
            const productName = product
            const productSelected = prods.find((p) => p.code == productName)
            if(amount <= 0){
                return alert("Preencha um valor válido!")
            }
            localStorage.setItem("carts", JSON.stringify(cartList))
            const cartProducts = JSON.parse(localStorage.getItem("carts"))
            const prod = productSelected
            for(const cartproduct of cartProducts){
                if(cartproduct.product.name == prod.name){
                    return alert("Produto já selecionado!")
                }
            }
            if(amount.value == ""){
                return alert("Informe a quantidade!")
            }
            if(prod.amount >= amount){
                cartList.push({amount: amount, product: prod })
                localStorage.setItem("carts", JSON.stringify(cartList))
                alert("Product name: " + product + ", Product amount: " + amount + ", Product price: " + price + ", Product tax: " + tax)
                product = 0
                tax = ""
                price = ""
                amount = ""
                setCarts(JSON.parse(localStorage.getItem("carts")))
            }
        }
        useEffect(() => {
            function showCarts(){
                const data = JSON.parse(localStorage.getItem("carts")) || []
                carts = data
                setCarts(carts)
            }
            showCarts()
        },[])
    totalPrices()
    changeValues()

    return (
        <div>
            <NavComponent />
            <div className="main">
                <div className="gridArea1">
                    <form id="product-form" onSubmit={addProductToCart}>
                        <select value={product} onChange={(e) => setProduct(e.target.value)} className="mainselect" id="input-product-category" name="products">
                            <option value={0} disabled>Product</option>
                            {products.map((product) => (
                                <option key={product.code} value={product.code}>{product.name} (Quantidade em estoque: {product.amount})</option>
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
                        <ButtonComponent styleclass={"btngridArea1"} text="Add Product"/>
                    </form>
                </div>
                <div className="gridArea2">
                    {carts.map((cart) => (
                            <div className="divitems" key={cart.index}>
                                <div>{cart.product.name}</div>
                                <div>Price: ${cart.product.price}</div>
                                <div>Amount: {cart.amount}</div>
                                <div>Tax: {cart.product.tax_category}%</div>
                                <div>Total: ${cart.product.price * cart.amount + (cart.product.price * cart.amount * (cart.product.tax_category / 100))}</div>
                                <ButtonComponent styleclass={"btnalternative"} text={"Delete"} btnFunction={deleteItem}/>
                            </div>
                            
                    ))}
                    <div className="divtotal">
                        <div className="totalandtax">Total Tax: ${totaltax}</div>
                        <div className="totalandtax">Total Price: ${total}</div>
                    </div>
                    <div className="divfinish">
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
            </div>
        </div>
    )
}
export default IndexComponent