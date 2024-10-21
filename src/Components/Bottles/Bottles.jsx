import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    const handleAddToCart = bottle =>{
        // console.log('Bottles are clicking', bottle)
        const newCart = [...cart, bottle];
        setCart(newCart)
    }

    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            <h4>Carted Bottles:{cart.length}</h4>
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