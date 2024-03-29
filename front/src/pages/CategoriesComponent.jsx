import "../assets/style.css"
import { useState, useEffect } from "react"
import NavComponent from "../components/NavComponent"
import ButtonComponent from "../components/ButtonComponent"
import CategoryItemsComponent from "../components/CategoryItemsComponent"
const url = "http://localhost/routes/categories.php"
function CategoriesComponent() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [tax, setTax] = useState("")
    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch(url)
            const data = await res.json()
            setCategories(data);
        }
        fetchCategories()
    }, []);
    const handleAddCategory = async (e) => {
        e.preventDefault()

        const category = {
            name,
            tax,
        }
        console.log(category)
        const data = new FormData()
        data.append("name", name)
        data.append("tax", tax)
        if(tax <= 0 || name == ""){
            return alert("Insira um valor válido!")
        }else{
            const res = await fetch(url, {
                method: "POST",
                body: data
            })
            window.location.reload()
            const addedCategory = await res.json()
            setCategories((prevCategories) => [...prevCategories, addedCategory])
            setName("")
            setPrice("")
        }

    }
    function deleteCategory(code) {
        fetch(`http://localhost/routes/categories.php?code=${code}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((res) => {

            })
            window.location.reload()
        })
    }

    return (
        <div>
            <NavComponent />
            <div className="main">
                <div className="gridArea1">
                    <div className="form">
                        <form id="category-form" onSubmit={handleAddCategory}>
                            <div className="secondaryselects">
                                <label htmlFor="name"></label>
                                <input id="category-name-input" name="name" className="secondaryselect1" type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="tax"></label>
                                <input id="category-tax-input" name="tax" className="secondaryselect1" style={{ marginLeft: "10px" }} type="number" min={0} placeholder="Tax" value={tax} onChange={(e) => setTax(e.target.value)} />
                            </div>
                            <div>
                                <ButtonComponent styleclass={"btngridArea1"} text="Add Category"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="gridArea2">
                    {categories.map((category) => (
                        <CategoryItemsComponent categoryCode={category.code} categoryName={category.name} categoryTax={category.tax} deleteCategory={deleteCategory}/>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default CategoriesComponent