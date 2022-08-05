import { uniqBy } from "lodash"



export const addToCart = (item) => {

    let items = JSON.parse(localStorage.getItem('cart')) || []

    items = uniqBy([{...item , "count" : 1} , ...items], '_id')

    localStorage.setItem('cart', JSON.stringify(items))

    return {
        type : 'ADD_ITEM',
        payload : items
    }

}


export const incrementProduct = (item) => {

    let items = JSON.parse(localStorage.getItem('cart'))

    items = items.map((product) => product._id === item._id ? {...item, count : product.count + 1} : product)

    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type : 'INC_PRODUCT',
        payload : items
    }


}

export const decrementProduct = (item) => {

    if(item.count > 1){
        let items = JSON.parse(localStorage.getItem('cart'))

    items = items.map((product) => product._id === item._id ? {...item, count : product.count - 1} : product)

    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type : 'DEC_PRODUCT',
        payload : items
    }

    }

    return {type : null}

    

}

export const removeFromCart = (id) => {
    let items = JSON.parse(localStorage.getItem('cart'))

    items = items.filter((product) => product._id !== id)

    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type : 'REMOVE_FROM_CART',
        payload : items
    }

}