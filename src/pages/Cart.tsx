import React, { useState, useEffect } from 'react';
import IPage from '../interfaces/page';
import axios from 'axios';
import '../styles/cart.css';

const Cart: React.FunctionComponent<IPage> = (props) => {

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
                <div className="cart__item">
                    <div className="cart__item-left-side">
                        <img src={pizzaImage} alt="" className="cart__item-image" />
                        <div className="cart__item-info">
                            <h3 className="cart__item-title">Pepperoni</h3>
                            <span className="cart__item-size">40cm</span>
                        </div>
                    </div>
                    <div className="cart__item-right-side">
                        
                    </div>
                </div>
            </div>
            <div className="cart__summary">

            </div>
            <div className="cart__buttons">

            </div>
        </div>
    );
}

export default Cart;
