import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderInfo.css';

interface IOrderInfo {

}
interface IOrder {
    address: string;
    tel: string;
    email: string;
    name: string;
    pizzaSettings: Array<IData>
    price: number;
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

const OrderInfo: React.FunctionComponent<IOrderInfo> = (props) => {

    const [info, setInfo] = useState<IOrder | null>(null);
    
    const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const address = (form.querySelector('.order-info__address') as HTMLInputElement).value;
        const tel = (form.querySelector('.order-info__tel') as HTMLInputElement).value;
        const email = (form.querySelector('.order-info__email') as HTMLInputElement).value;
        const name = (form.querySelector('.order-info__name') as HTMLInputElement).value;

        const cartString = localStorage.getItem('cart') as string;
        const pizzaSettings = JSON.parse(cartString) as Array<IData>;

        let price = 0;

        pizzaSettings.forEach((e: IData) => {
            price += Number(e.finalPrice);
        });

        setInfo({ address, tel, email, name, pizzaSettings, price });
    }

    useEffect(() => {
        console.log(info);
        axios.post('http://localhost:8081/placeOrder', info);
    }, [info]);
    
    return (
        <div className="order-info">
            <form onSubmit={placeOrder} className="order-info__form">
                <label className="order-info__label">Address:
                    <input type="text" placeholder="Street, house number" className="order-info__address" required />
                </label>
                <label className="order-info__label">Phone number:
                    <input type="tel" placeholder="+48 000 000 000" className="order-info__tel" required />
                </label>
                <label className="order-info__label">Email:
                    <input type="email" placeholder="example@gmail.com" className="order-info__email" required />
                </label>
                <label className="order-info__label">Your name:
                    <input type="text" placeholder="Thomas" className="order-info__name" required />
                </label>
                <input type="submit" value="Place order" className="order-info__submit" />
            </form>
        </div>
    );
}

export default OrderInfo;