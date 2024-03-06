const url = 'http://localhost/routes/products.php'
const urlCategories = 'http://localhost/routes/categories.php'
const productForm = document.getElementById('product-form')
const productsList = document.getElementById('list-products')
const inputCategory = document.getElementById('input-product-category')


async function loadCategories(){
    const response = await fetch(urlCategories)
    const categoryList = await response.json()

    console.log(categoryList)

    showProducts()
    return categoryList
}

async function selectCategories(){
    const categories = await loadCategories()
    for( const category of categories){
        inputCategory.innerHTML += `<option value="${category.code}">${category.name}</option>`
    }
}

async function showProducts(){
    const response = await fetch(url)
    const productList = await response.json()
    console.log(productList)
    productsList.innerHTML = ''

    productList.forEach((product) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<tr>
            <td class="tablemainitem">${product.code}</td>
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
            <td>${product.name_category}</td>
            <td>${product.tax_category}%</td>
            <td><button onclick="deleteProduct(${product.code})" class="btnalternative">Delete</button></td>
            </tr>`
            productsList.appendChild(tr)
        })
    }
    function addNewProduct(){
        productForm.addEventListener('submit', async event => {
            event.preventDefault()
            const data = new FormData(productForm)
            try{
                const res = await fetch(
                    'http://localhost/routes/products.php',{
                        method: 'POST',
                        body: data
                    },
                    window.location.reload()
                )
            } catch(error){
                console.log(error.message)
            }
        })

    }

    async function deleteProduct(code){
        const form = new FormData();
    
        const options = {
        method: 'DELETE',
        headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'}
        };
    
        options.body = form;
    
        fetch(`http://localhost/routes/products.php?code=${code}`, options)
        .then(response => response.text())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        window.location.reload()
    }

    showProducts()
    selectCategories()