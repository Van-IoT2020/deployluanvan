export const addNumberCart = (sl) => {
    return {
        type: "ADD_CART",
        payload: sl
    };
}

export const deleteNumberCart = (sl) => {
    return {
        type: "DEL_CART",
        payload: sl
    };
}


export const removeNumberCart = () => {
    return {
        type: "REMOVE_CART",
    };
}