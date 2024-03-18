function ButtonComponent({styleclass, text, btnFunction, itemCode }){
    return (
        <div>
            <input type="submit" className={styleclass} value={text} onClick={() => {btnFunction(itemCode)}}/>
        </div>
    )
}

export default ButtonComponent