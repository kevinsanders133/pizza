import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderInfo.css';

interface IOrder {
    address: string;
    tel: string;
    email: string;
    name: string;
    pizzaSettings: Array<IPizzaSettings>
    price: number;
}
interface IPizzaSettings {
    id: string;
    quantity: string;
    size: string;
    extrasIds: Array<string>;
    finalPrice: string;
}

const OrderInfo: React.FunctionComponent = () => {

    const [info, setInfo] = useState<IOrder | null>(null);
    
    const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const tel = (form.querySelector('.order-info__tel') as HTMLInputElement).value;
        const regex = new RegExp(/^\+48[0-9]{9}$/gm);
        if (regex.test(tel)) {
            const address = (form.querySelector('.order-info__address') as HTMLInputElement).value;
            const email = (form.querySelector('.order-info__email') as HTMLInputElement).value;
            const name = (form.querySelector('.order-info__name') as HTMLInputElement).value;

            const cartString = localStorage.getItem('cart') as string;
            const pizzaSettings = JSON.parse(cartString) as Array<IPizzaSettings>;

            let price = 0;

            pizzaSettings.forEach((e: IPizzaSettings) => {
                price += Number(e.finalPrice);
            });

            setInfo({ address, tel, email, name, pizzaSettings, price });
        } else {
            const tel = form.querySelector('.order-info__tel') as HTMLInputElement;
            const errorMessage = tel.nextElementSibling as HTMLSpanElement;
            errorMessage.style.opacity = '1';
            setTimeout(() => {
                errorMessage.style.opacity = '0';
            }, 3000);
        }
    }

    useEffect(() => {
        sendRequest();
    }, [info]);
    
    const sendRequest = async () => {
        const res = await axios.post('http://localhost:8081/placeOrder', info);
        console.log(res.data);
        localStorage.removeItem('cart');
        window.location.href = "/confirm";
    }

    return (
        <div className="order-info">
            <form onSubmit={placeOrder} className="order-info__form">
                <label className="order-info__label">Address:
                    <input type="text" placeholder="Street, house number" className="order-info__address" required />
                </label>
                <label className="order-info__label">Phone number:
                    <input type="tel" placeholder="+48000000000" minLength={12} maxLength={12} pattern="+48[0-9]{3}[0-9]{3}[0-9]{3}" className="order-info__tel" required />
                    <span className="order-info__tel-error">Incorrect phone number. Pattern: "+48000000000"</span>
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