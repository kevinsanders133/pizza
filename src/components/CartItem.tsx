import React, { useState, useEffect, ChangeEventHandler } from 'react';
import axios from 'axios';

interface IData {
    id: string;
    quantity: string;
    size: string;
    extrasIds: Array<string>;
    defaultPrice: string;
    finalPrice: string;
    extrasPrice: string;
}
interface ICartItem {
    id: number;
    pizzaImage: string;
    quantity: string;
    size: string;
    defaultPrice: string;
    extrasPrice: string;
    onChangeHandler: (id: number, quantity: string, price: string) => void;
}

const CartItem: React.FunctionComponent<ICartItem> = (props) => {

    const [quantity, setQuantity] = useState(props.quantity);
    const [price, setPrice] = useState(String(Number(props.defaultPrice) * Number(quantity) + Number(props.extrasPrice)));

    useEffect(() => {
        props.onChangeHandler(props.id, quantity, price);
    }, [price]);

    const decrement = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const input = target.nextElementSibling as HTMLInputElement;
        input.stepDown();
        console.log("Input value: " + input.value);
        setQuantity(input.value);
    }

    const increment = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const input = target.previousElementSibling as HTMLInputElement;
        input.stepUp();
        setQuantity(input.value);
    }
    
    useEffect(() => {
        setPrice(String(Number(props.defaultPrice) * Number(quantity) + Number(props.extrasPrice)));
    }, [quantity]);

    return (
        <div className="cart__item">
            <div className="cart__item-left-side">
                <img src={props.pizzaImage} alt="" className="cart__item-image" />
                <div className="cart__item-info">
                    <h3 className="cart__item-title">Pepperoni</h3>
                    <span className="cart__item-size">{props.size}cm</span>
                </div>
            </div>
            <div className="cart__item-right-side">
                <div className="cart__item-quantity-container">
                    <button className="cart__item-dec" onClick={decrement}>-</button>
                    <input type="number" min="1" max="10" defaultValue={quantity} className="cart__item-quantity" />
                    <button className="cart__item-inc" onClick={increment}>+</button>
                </div>
                <div className="cart__item-price">{price}$</div>
                <div className="cart__item-delete-button">
                    <div className="cart__item-cross"></div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;