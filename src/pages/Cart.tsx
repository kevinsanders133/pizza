import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import '../styles/cart.css';

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
    pizzaImage: string;
    quantity: string;
    size: string;
    defaultPrice: string;
    extrasPrice: string;
}

const Cart: React.FunctionComponent = () => {

    const [cartString, setCartString] = useState<string | null>(localStorage.getItem('cart') ?? null);
    const [cart, setCart] = useState<Array<IData> | null>(null);
    const [cartItems, setCartItems] = useState<React.FunctionComponent<ICartItem>[]>([]);

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const cartImage: string = imagesFolder('./cart-black.svg').default;
    const pizzaImage: string = imagesFolder('./shrimp.svg').default;

    useEffect(() => {
        updateCart();
    }, []);

    const updateCart = () => {
        if (cartString) {
            const cartArr = JSON.parse(cartString) as Array<IData>;
            const temp: React.FunctionComponent<ICartItem>[] = [];

            setCart(cartArr);

            cartArr.forEach((e: IData) => {
                temp.push(
                    <CartItem 
                        key={e.id}
                        pizzaImage={pizzaImage}
                        quantity={e.quantity}
                        size={e.size}
                        defaultPrice={e.defaultPrice}
                        extrasPrice={e.extrasPrice}
                    /> as unknown as React.FunctionComponent<ICartItem>
                );
            });

            setCartItems(temp);
        }
    }

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
                {cartItems}
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
