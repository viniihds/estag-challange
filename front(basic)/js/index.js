const urlOrders = "http://localhost/routes/orders.php"
const urlProducts = "http://localhost/routes/products.php"
const inputProduct = document.getElementById("input-cart-product")
const inputTax = document.getElementById("input-cart-tax")
const inputPrice = document.getElementById("input-cart-price")
const inputAmount = document.getElementById("input-cart-amount")
const cartProductsList = document.getElementById('list-cart')
const totalPrices = document.getElementById("total-prices")
const btnFinish = document.getElementById("btn-finish-cart")

async function loadProducts(){
    const response = await fetch(urlProducts)
    const productsList = await response.json()
    return productsList    
}
async function selectProducts(){
    const products = await loadProducts()

    for(const product of products){
        inputProduct.innerHTML += `<option value="${product.code}">${product.name}</option>`
    }
}
async function getProduct(){
    const response = await fetch(urlProducts)
    const products = await response.json()
    return products
}

async function changeValues(){
    const products = await getProduct()
    const productName = inputProduct.value
    const productSelected = products.find((p) => p.code == productName)
    
    if(productSelected){
        inputPrice.value = productSelected.price
        inputTax.value = productSelected.tax_category
    }   

}

function loadCart() {
    const dataCart = JSON.parse(localStorage.getItem('carts')) || []
    return dataCart
   // showCartProducts()
}

async function addProductToCart(e){
    let cartList = loadCart()
    e.preventDefault()
    const products = await getProduct()
    const productName = inputProduct.value
    const productSelected = products.find((p) => p.code == productName)
    if(inputAmount.value <= 0){
        return alert("Preencha um valor válido!")
    }
    localStorage.setItem("carts", JSON.stringify(cartList))
    const cartProducts = JSON.parse(localStorage.getItem("carts"))
    const product = productSelected
    for(const cartproduct of cartProducts){
        if(cartproduct.product.name == product.name){
            return alert("Produto já selecionado!")
        }
    }
    if(inputAmount.value == ""){
        return alert("Informe a quantidade!")
    }
    if(product.amount >= inputAmount.value){
        cartList.push({amount: inputAmount.value, product: product })
        localStorage.setItem("carts", JSON.stringify(cartList))
        alert("Product name: " + inputProduct.value + ", Product amount: " + inputAmount.value + ", Product price: " + inputPrice.value + ", Product tax: " + inputTax.value)
        inputProduct.value = 0
        inputTax.value = ""
        inputPrice.value = ""
        inputAmount.value = ""
        // showCartProducts()
    }
}
// function showCartProducts(){
//     let cartList = loadCart()
//     console.log(cartList)
//     newList = ""
//     totalPriceCart = 0
//     totalTaxCart = 0
//     cartList.forEach((cartproduct, index) =>{
//         console.log(cartproduct)
//         newList += `
//         <tr>
//         <td>${cartproduct.product.name}</td>
//         <td>${cartproduct.product.price}</td>
//         <td>${(cartproduct.product.price * (cartproduct.product.tax_category / 100)).toFixed(2)}</td>
//         <td>${cartproduct.amount}</td>
//         <td>${(cartproduct.amount * cartproduct.product.price + (cartproduct.amount * cartproduct.product.price * (cartproduct.product.tax_category / 100))).toFixed(2)}</td>
//         <td><button  class="btnalternative" onclick="removeProductCart(${index})">Delete</button></td>
//         </tr>
//         `
//         totalPriceCart += cartproduct.amount * cartproduct.product.price + (cartproduct.amount * cartproduct.product.price * (cartproduct.product.tax_category / 100))
//         totalTaxCart += cartproduct.product.price * cartproduct.amount *(cartproduct.product.tax_category / 100)
//     })
//     cartProductsList.innerHTML = newList
//     totalPrices.innerHTML = `
//         <div>
//             <p><p class="tax_total">Tax:</p> $${(totalTaxCart).toFixed(2)}</p>
//         </div>
//         <div>
//             <p><p class="tax_total">Total:</p> $${(totalPriceCart).toFixed(2)}</p>
//         </div>
//     `
// }

function removeProductCart(index){
    let cartList = loadCart()
    cartList.splice(index,1)
    localStorage.setItem("carts", JSON.stringify(cartList))
    // showCartProducts()
}

function cancelCart(){
    let cartList = loadCart()
    cartList.splice(0)
    localStorage.setItem("carts", JSON.stringify(cartList))
    // showCartProducts()
}

function finishCart(){
        let cart = loadCart()
        console.log(cart)
        const newCart = cart.map(item => {
            return {
                amount : item.amount,
                code : item.product.code
            }
        })
        console.log(newCart)
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


// showCartProducts()
selectProducts()
loadCart()