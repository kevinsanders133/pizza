import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface IPizzaBlock {
    name: string;
    photo: string;
    defaultPrice: string;
    pizzaId: number;
}

interface IData {
    id: string;
    quantity: string;
    size: string;
}

const PizzaBlock: React.FunctionComponent<IPizzaBlock> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const id = (target.querySelector('input[name="id"]') as HTMLInputElement).value;
        const quantity = (target.querySelector('input[name="quantity"]') as HTMLInputElement).value;
        const size = (target.querySelector('input[name="size"]:checked') as HTMLInputElement).value;

        const data: IData = { id, quantity, size };

        console.log(data);
        const res = await axios.get('http://localhost:8081/test');
        const obj = res.data;
        console.log(obj);
    }

    return (
        <form onSubmit={onSubmit} className="pizza">
            <input type="hidden" name="id" value={props.pizzaId} />
            <img className="pizza__photo" src={image} />
            <div className="pizza__content">
                <h4 className="pizza__name">{props.name}</h4>
                <label className="pizza__quantity-block">
                    Quantity: 
                    <input type="number" name="quantity" min="1" max="10" defaultValue="1" className="pizza__quantity" />
                </label>
                <div className="pizza__radios-container">
                    <fieldset className="pizza__radios">
                        <input type="radio" name="size" className="pizza__radio" defaultValue="24" />
                        <input type="radio" name="size" className="pizza__radio" defaultValue="32" />
                        <input type="radio" name="size" className="pizza__radio" defaultValue="40" />
                    </fieldset>
                    <div className="pizza__custom-radios">
                        <div className="pizza__custom-radio">24</div>
                        <div className="pizza__custom-radio">32</div>
                        <div className="pizza__custom-radio">40</div>
                    </div>
                </div>
                <input type="submit" value="Order" className="pizza__order-button" />
            </div>
        </form>
    );
}

export default PizzaBlock;
