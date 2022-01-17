import React, { useState, useEffect } from 'react';

interface ICartItem {
    id: number;
    pizzaImage: string;
    quantity: string;
    name: string;
    size: string;
    defaultPrice: string;
    extrasPrice: string;
    onChangeHandler: (id: number, quantity: string, price: string) => void;
    onDeleteHandler: (id: number) => void;
}

const CartItem: React.FunctionComponent<ICartItem> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/pizza', true);
    const pizzaImage: string = imagesFolder(`./${props.pizzaImage}.jpg`).default;

    const [quantity, setQuantity] = useState(props.quantity);
    let coef: number;
    if (props.size == '24') {
        coef = 0.8;
    } else if (props.size == '32') {
        coef = 1;
    } else {
        coef = 1.2;
    }
    const [price, setPrice] = useState(String(Number(props.defaultPrice) * coef * Number(quantity) + Number(props.extrasPrice)));

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
        setPrice((Number(props.defaultPrice) * coef * Number(quantity) + Number(props.extrasPrice)).toFixed(2));
    }, [quantity]);

    const deleteItem = () => {
        props.onDeleteHandler(props.id);
    }

    return (
        <div className="cart__item">
            <div className="cart__item-left-side">
                <img src={pizzaImage} alt="" className="cart__item-image" />
                <div className="cart__item-info">
                    <h3 className="cart__item-title">{props.name}</h3>
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
                <div className="cart__item-delete-button" onClick={deleteItem}>
                    <div className="cart__item-cross"></div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;