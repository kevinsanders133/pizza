import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ICartItem {
    pizzaImage: string;
}

const CartItem: React.FunctionComponent<ICartItem> = (props) => {

    const decrement = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        if (target.nextElementSibling) {
            const input = target.nextElementSibling as HTMLInputElement;
            input.stepDown();
            // setQuantity(Number(input.value));
        }
    }

    const increment = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        if (target.previousElementSibling) {
            const input = target.previousElementSibling as HTMLInputElement;
            input.stepUp();
            // setQuantity(Number(input.value));
        }
    }

    return (
        <div className="cart__item">
            <div className="cart__item-left-side">
                <img src={props.pizzaImage} alt="" className="cart__item-image" />
                <div className="cart__item-info">
                    <h3 className="cart__item-title">Pepperoni</h3>
                    <span className="cart__item-size">40cm</span>
                </div>
            </div>
            <div className="cart__item-right-side">
                <div className="cart__item-quantity-container">
                    <button className="cart__item-dec" onClick={decrement}>-</button>
                    <input type="number" min={1} max={10} defaultValue={1} className="cart__item-quantity" />
                    <button className="cart__item-inc" onClick={increment}>+</button>
                </div>
                <div className="cart__item-price">700 $</div>
                <div className="cart__item-delete-button">
                    <div className="cart__item-cross"></div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;