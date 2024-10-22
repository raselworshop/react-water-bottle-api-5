import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLocalStorage, getItemFromLocalStorage, removeFromLocalS } from "../Utilities/LocalStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, []);

    //load cart from local storage
    useEffect(() => {
        console.log('called useEffect', bottles.length)
        if (bottles.length > 0) {
            const storedCart = getItemFromLocalStorage();
            // console.log(storedCart, bottles)
            const saveCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle= bottles.find(bottle=> bottle.id === id);
                if(bottle){
                    saveCart.push(bottle)
                }
            }console.log(saveCart)
            setCart(saveCart)
        }
    }, [bottles])

    const handleAddToCart = bottle => {
        // console.log('Bottles are clicking', bottle)
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLocalStorage(bottle.id)
    }

    const handleRemoveCart = id =>{
        // visual remove cart 
        const remainingCart = cart.filter(bottle=>bottle.id !== id)
        setCart(remainingCart)
        // LS remove cart
        removeFromLocalS(id)
    }

    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            <Cart cart={cart} handleRemoveCart={handleRemoveCart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;