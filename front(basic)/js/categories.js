const categoriesList = document.getElementById("list-categories")
const url = "http://localhost/routes/categories.php"
const categoryForm = document.getElementById("category-form")
const inputName = document.getElementById('category-name-input')
const inputTax = document.getElementById('category-tax-input')

function addNewCategory(){
    categoryForm.addEventListener('submit', async event => {
        event.preventDefault()
        const data = new FormData(categoryForm)
        try{
            const res = await fetch(
                'http://localhost/routes/categories.php',{
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

async function showCategories(){
    const response = await fetch(url)
    const categoryList = await response.json()
    console.log(categoryList)
    categoriesList.innerHTML = ''

    categoryList.forEach((category) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `<tr>
            <td class="tablemainitem">${category.code}</td>
            <td>${category.name}</td>
            <td>${category.tax}%</td>
            <td><button onclick="deleteCategory(${category.code})" class="btnalternative">Delete</button></td>
            </tr>`
            categoriesList.appendChild(tr)
        })
    }


async function deleteCategory(code){
    const form = new FormData();

    const options = {
    method: 'DELETE',
    headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'}
    };

    options.body = form;

    fetch(`http://localhost/routes/categories.php?code=${code}`, options)
    .then(response => response.text())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    window.location.reload()
}


    showCategories()