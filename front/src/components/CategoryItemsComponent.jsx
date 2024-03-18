import ButtonComponent from "./ButtonComponent"
import "../pages/CategoriesComponent"
function CategoryItemsComponent({categoryCode, categoryName, categoryTax, deleteCategory}){
    return(
        <div className="divitems" key={categoryCode}>
        <div>Code: {categoryCode}</div>
        <div>Name: {categoryName}</div>
        <div>Tax: {categoryTax}%</div>
        <ButtonComponent styleclass={"btnalternative"} text={"Delete"} btnFunction={deleteCategory} itemCode={categoryCode}/>
    </div>
    )
}
export default CategoryItemsComponent