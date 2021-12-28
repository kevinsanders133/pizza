import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface IPizzaBlock {
    name: string;
    photo: string;
    defaultPrice: string;
    pizzaId: number;
    func: (data: any) => void;
}

interface IData {
    id: string;
    quantity: string;
    size: string;
}

const PizzaBlock: React.FunctionComponent<IPizzaBlock> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    const sendIdToHomeComp = () => {
        const data = {
            pizzaId: props.pizzaId,
            photo: props.photo,
        };
        props.func(data);
    }

    return (
        <div className="pizza">
            <img className="pizza__photo" src={image} />
            <div className="pizza__content">
                <h4 className="pizza__name">{props.name}</h4>
                <div className="pizza__description">
                    Ветчина, картофель из печи, моцарелла, соус альфредо
                </div>
                <div className="pizza__select-container">
                    <div className="pizza__start-price">from {props.defaultPrice}$</div>
                    <button onClick={sendIdToHomeComp} className="pizza__order-button">Select</button>
                </div>
            </div>
        </div>
    );
}

export default PizzaBlock;
