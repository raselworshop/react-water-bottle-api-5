const getItemFromLocalStorage=()=>{
    const storedCartString = localStorage.getItem('cart');
    if(storedCartString){
        return JSON.parse(storedCartString)
    }return [];
}

const saveCartToLocal = cart =>{
    const cartStringfied = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringfied)
}

const addToLocalStorage= id =>{
    const cart = getItemFromLocalStorage();
    cart.push(id)
    // save to l;ocal storage
    saveCartToLocal(cart)
}

const removeFromLocalS=id=>{
    const cart = getItemFromLocalStorage();
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLocal(remaining)
}

export {addToLocalStorage, getItemFromLocalStorage, removeFromLocalS}