const urlOrders = "http://localhost/routes/orders.php"
const listOrders = document.getElementById("list-sales")
const detailsOrders = document.getElementById("sale-details")
const btnShowDetails = document.getElementById("btn-show-details")


async function loadOrders(){
    const response = await fetch(urlOrders)
    const orderList = await response.json()
    return orderList
}

async function showOrders(){
    const orderList = await loadOrders()
    console.log(orderList)
    listOrders.innerHTML = ''

    orderList.forEach((order) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<tr>
            <td class="tablemainitem">${order.code}</td>
            <td>${order.tax}</td>
            <td>${order.total}</td>
            <td><button onclick="showOrderDetails(${order.code})" class="btnalternative">Details</button></td>
            </tr>`
            listOrders.appendChild(tr)
        })
    }
// function getSalesByCode(code){
//     const sales = JSON.parse(localStorage.getItem('carts')) || []
//     for (const sale of sales) {
//         if (
//             code == sale.code
//         ) {
//             return sale
//         }
//     }
// }
async function showOrderDetails(code){
    const response = fetch(`http://localhost/routes/orders.php?code=${code}`).then(res => {
    return res.json()
    })
    const orderList = await response
    console.log(orderList)
    orderList.products.forEach((order) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<tr>
            <td class="tablemainitem">${order.name}</td>
            <td>${order.price}</td>
            <td>${order.tax}%</td>
            <td>${order.amount}%</td>
            <td>${order.amount}%</td>
            <td><button class="btnalternative">Delete</button></td>
            </tr>`
            detailsOrders.appendChild(tr)
        })
}

// function showSaleDetails(code){
//     newList = ''
//     const saleLists = getSalesByCode(code)

//     saleLists.products.forEach(x => {
//         newList = newList + `<tr>
//             <td class="tablemainitem">${x.product.name}</td>
//             <td>${x.product.price}</td>
//             <td>${x.product.category.tax}</td>
//             <td>${x.amount}</td>
//             <td>$${(x.amount * x.product.price + (x.amount * x.product.price * (x.product.category.tax / 100))).toFixed(2)}</td>
//             `
//     })
//     saleDetails.innerHTML = newList
// }






showOrders()