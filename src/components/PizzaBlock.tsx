import React from 'react';
import { useState, useEffect } from 'react';

interface IPizzaBlock {
    name: string;
    photo: string;
    defaultPrice: string;
}

const PizzaBlock: React.FunctionComponent<IPizzaBlock> = (props) => {

    let imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/svg', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    return (
        <form action="#" className="pizza">
            <img className="pizza__photo" src={image} />
            <h4 className="pizza__name">{props.name}</h4>
            <label className="pizza__quantity-block">
                Quantity: 
                <input type="number" min="1" max="10" defaultValue="1" className="pizza__quantity" />
            </label>
            <div className="pizza__radios-container">
                <fieldset className="pizza__radios">
                    <input type="radio" name={props.name} className="pizza__radio" defaultValue="18" />
                    <input type="radio" name={props.name} className="pizza__radio" defaultValue="24" />
                    <input type="radio" name={props.name} className="pizza__radio" defaultValue="32" />
                </fieldset>
                <div className="pizza__custom-radios">
                    <div className="pizza__custom-radio">18</div>
                    <div className="pizza__custom-radio">24</div>
                    <div className="pizza__custom-radio">32</div>
                </div>
            </div>
            <input type="submit" value="Order" className="pizza__order-button" />
        </form>
    );
}

export default PizzaBlock;
