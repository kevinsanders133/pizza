import React, { useState, useEffect } from 'react';

interface IExtra {
    id: number;
    name: string;
    price: number;
    photo: string;
}

const Extra: React.FunctionComponent<IExtra> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/img', true);
    const image: string = imagesFolder(`./${props.id}.png`).default;

    return (
        <div className="popup__extra-container">
            <img src={image} alt="" className="popup__extra-photo" />
            <div className="popup__extra-info">
                <span className="popup__extra-name">{props.name}</span>
                <span className="popup__extra-price">{props.price.toFixed(2)}$</span>
            </div>
        </div>
    );
}

export default Extra;