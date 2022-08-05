

let items = JSON.parse(localStorage.getItem('cart')) || []


let myState = {
   products : items,
   count : items.reduce((total, product) => total + product.count, 0)
}

const cartReducer = (state = myState, action) => {

      switch(action.type) {

        case 'ADD_ITEM' : {
          return {
             ...state , 
            products : action.payload,
            count : action.payload.length
          }
           
        }

        case 'INC_PRODUCT' : {
          return {
             ...state , 
            products : action.payload,
            count : state.count + 1
           
          }
           
        }

        case 'DEC_PRODUCT' : {
          return {
             ...state , 
            products : action.payload,
            count : state.count - 1
           
          }
           
        }

        case 'REMOVE_FROM_CART' : {
          return {
            ...state , 
           products : action.payload,
           count : action.payload.reduce((total, product) => total + product.count, 0)
          
         }
        }

        default: {
            return state
        }

      }

}


export default cartReducer;