import "../assets/style.css"
import { useState, useEffect } from "react"
import NavComponent from "../components/NavComponent"
import ButtonComponent from "../components/ButtonComponent"
import ProductItems from "../components/ProductItemsComponent"
const url = "http://localhost/routes/products.php"
function ProductsComponent() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState(0)
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(url)
            const data = await res.json()
            setProducts(data);
        }
        fetchProducts()
    }, []);
    const handleAddProduct = async (e) => {
        e.preventDefault()

        const product = {
            name,
            amount,
            price,
            category,
        }
        console.log(product)
        const data = new FormData()
        data.append("name", name)
        data.append("amount", amount)
        data.append("price", price)
        data.append("category", category)
        if(amount <= 0 || price <= 0 || name == "" ){
            return alert("Insira valores válidos")
        } else{
            const res = await fetch(url, {
                method: "POST",
                body: data
            })
            window.location.reload()
            const addedProduct = await res.json()
            setProducts((prevProducts) => [...prevProducts, addedProduct])
            setName("")
            setCategory(0)
            setAmount("")
            setPrice("")
        }

    }
    function deleteProduct(code) {
        fetch(`http://localhost/routes/products.php?code=${code}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((res) => {

            })
            window.location.reload()
        })
    }
    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch("http://localhost/routes/categories.php")
            const data = await res.json()
            console.log(data)
            setCategories(data);
        }
        fetchCategories()
    }, []);

    return (
        <div>
            <NavComponent />
            <div className="main">
                <div className="gridArea1">
                    <div className="form">
                        <form id="product-form" onSubmit={handleAddProduct}>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mainselect" id="input-product-category" name="category">
                                <option value={0} disabled>Category</option>
                                {categories.map((category) => (
                                    <option key={category.code} value={category.code} >{category.name}</option>
                                ))}
                            </select>

                            <div className="secondaryselects">
                                <label htmlFor="name"></label>
                                <input id="product-name-input" name="name" className="secondaryselect1" type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="tax"></label>
                                <input id="product-amount-input" name="tax" className="secondaryselect2" style={{ marginLeft: "10px" }} type="number" min={0} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                <label htmlFor="tax"></label>
                                <input id="product-price-input" name="tax" className="secondaryselect2" style={{ marginLeft: "10px" }} type="float" min={0} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <ButtonComponent styleclass={"btngridArea1"} text="Add Product"/>
                        </form>
                    </div>
                </div>
                <div className="gridArea2">
                    {products.map((product) => (
                        <ProductItems productCode={product.code} productName={product.name} productAmount={product.amount} productPrice={product.price} productCategory={product.name_category} deleteProduct={deleteProduct} />
                    ))}
                </div>
            </div>
        </div>

    )
}
export default ProductsComponent