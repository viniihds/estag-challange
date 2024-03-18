import ButtonComponent from "./ButtonComponent"
function ProductItems({productCode, productName, productAmount, productPrice, productCategory, deleteProduct}) {
    return (
        <div className="divitems" key={productCode}>
            <div>Code: {productCode}</div>
            <div>Name: {productName}</div>
            <div>Amount: {productAmount}</div>
            <div>Price: ${productPrice}</div>
            <div>Category: {productCategory}</div>
            <ButtonComponent styleclass={"btnalternative"} text={"Delete"} btnFunction={deleteProduct} itemCode={productCode} />
        </div>
    )
}
export default ProductItems