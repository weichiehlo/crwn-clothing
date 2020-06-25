export const addItemToCart = (cartItems, cartItemsToAdd) =>{
    const existingCartItem = cartItems.find(
        cartItem=>cartItem.id === cartItemsToAdd.id
    );

    if(existingCartItem){
        return cartItems.map(cartItem =>
            {
                return(
                    cartItem.id === cartItemsToAdd.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
                )
            }
            
            
            )
    }

    return [...cartItems,{...cartItemsToAdd, quantity: 1}]

};



export const removeItemFromCart = (cartItems,cartItemToRemove) =>{
    const existingCartItem = cartItems.find(
        cartItem=>cartItem.id === cartItemToRemove.id)

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem=>cartItem.id !== existingCartItem.id)
    }

    return cartItems.map(
        cartItem => 
        cartItem.id === existingCartItem.id? 
        { ...cartItem, quantity:cartItem.quantity-1}
        : cartItem

    )
}