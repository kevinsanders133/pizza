import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

interface ICart {
    updateCart: () => void;
}
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
    id: string;
    pizzaImage: string;
    quantity: string;
    size: string;
    defaultPrice: string;
    extrasPrice: string;
}

const Cart: React.FunctionComponent<ICart> = (props) => {

    const [cartString, setCartString] = useState<string | null>(localStorage.getItem('cart') ?? null);
    const [cart, setCart] = useState<Array<IData> | null>(null);

    const [cartItems, setCartItems] = useState<React.FunctionComponent<ICartItem>[]>([]);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const svgFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const cartImage: string = svgFolder('./cart-black.svg').default;
    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/pizza', true);
    const pizzaImage: string = imagesFolder('./1.jpg').default;

    useEffect(() => {
        let cartArr: IData[] | null = null;
        if (cartString) cartArr = JSON.parse(cartString) as Array<IData>;
        setCart(cartArr);
    }, []);

    useEffect(() => {
        console.log(cart);
        updateCart();
    }, [cart]);

    const updateCart = () => {
        const temp: React.FunctionComponent<ICartItem>[] = [];
        let counter = 0;
        setTotalQuantity(0);
        setTotalPrice(0);
        if (cart) {
            cart.forEach((e: IData) => {
                temp.push(
                    <CartItem 
                        key={e.id}
                        id={counter}
                        pizzaImage={pizzaImage}
                        quantity={e.quantity}
                        size={e.size}
                        defaultPrice={e.defaultPrice}
                        extrasPrice={e.extrasPrice}
                        onChangeHandler={changeSummary}
                        onDeleteHandler={deleteItem}
                    /> as unknown as React.FunctionComponent<ICartItem>
                );
                counter += 1;
                setTotalQuantity((prev) => (prev + Number(e.quantity)));
                setTotalPrice((prev) => (prev + Number(e.finalPrice)));
            });
    
            setCartItems(temp);
        }
    }

    useEffect(() => {}, [totalQuantity, totalPrice]);

    const changeSummary = (id: number, quantity: string, price: string) => {
        const temp: IData[] = JSON.parse(JSON.stringify(cart));

        temp[id]['quantity'] = quantity;
        temp[id]['finalPrice'] = price;

        localStorage.setItem('cart', JSON.stringify(temp));
        props.updateCart();

        setCart(() => (temp));
    }

    const deleteItem = (id: number) => {
        const temp: IData[] = JSON.parse(JSON.stringify(cart));

        temp.splice(id, 1);

        localStorage.setItem('cart', JSON.stringify(temp));
        props.updateCart();

        setCart(() => (temp));
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        props.updateCart();

        setCart(() => ([]));
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
                <button className="cart__clear-button" onClick={clearCart}>Clear cart</button>
            </div>
            <div className="cart__list">
                {cartItems}
            </div>
            <div className="cart__summary">
                <div className="cart__summary-quantity">Total pizza's quntity: <b>{totalQuantity}</b></div>
                <div className="cart__summary-price">Total price: <b>{totalPrice}$</b></div>
            </div>
            <div className="cart__buttons">
                <button className="cart__back"><Link to="/home">Back</Link></button>
                <button className="cart__submit"><Link to="/order-info">Continue</Link></button>
            </div>
        </div>
    );
}

export default Cart;
