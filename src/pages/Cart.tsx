import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import axios from 'axios';
import '../styles/cart.css';

interface ICart {

}

const Cart: React.FunctionComponent<ICart> = (props) => {

    const [data, setData] = useState({});

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const cartImage: string = imagesFolder('./cart-black.svg').default;
    const pizzaImage: string = imagesFolder('./shrimp.svg').default;

    // const getData = async () => {
    //     const res = await axios.get('http://localhost:8081/cart2');
    //     const obj = res.data;
    //     console.log(obj);
    //     setData(obj);
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <div className="cart">
            <div className="cart__header">
                <div className="cart__title-container">
                    <img src={cartImage} alt="" className="cart__title-image" />
                    <div className="cart__title">Cart</div>
                </div>
                <button className="cart__clear-button">Clear cart</button>
            </div>
            <div className="cart__list">
                <CartItem pizzaImage={pizzaImage} />
                <CartItem pizzaImage={pizzaImage} />
                <CartItem pizzaImage={pizzaImage} />
            </div>
            <div className="cart__summary">
                <div className="cart__summary-quantity">Total pizza's quntity: <b>3</b></div>
                <div className="cart__summary-price">Total price: <b>143$</b></div>
            </div>
            <div className="cart__buttons">
                <button className="cart__back">Back</button>
                <button className="cart__submit">Order</button>
            </div>
        </div>
    );
}

export default Cart;
