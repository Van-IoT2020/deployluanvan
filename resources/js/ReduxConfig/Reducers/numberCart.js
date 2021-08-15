const initialState = {
    sl: localStorage.getItem('numberCart') ? JSON.parse(localStorage.getItem('numberCart')).sl : 0
}

const numberCartReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CART": {
            let slItemAddCart = {
                sl: parseInt(state.sl) + parseInt(action.payload)
            }
            localStorage.setItem('numberCart', JSON.stringify(slItemAddCart));
            return slItemAddCart;
        }
        case "DEL_CART": {
            let slItemDelCart = {
                sl: parseInt(state.sl) - parseInt(action.payload)
            }
            localStorage.setItem('numberCart', JSON.stringify(slItemDelCart));
            return slItemDelCart;            
        }
        case "REMOVE_CART": {
            let slItemDelCart = {
                sl: 0
            }
            localStorage.removeItem('numberCart');
            return slItemDelCart;            
        }
        default: 
            return state;
    }
} 

export default numberCartReducer;