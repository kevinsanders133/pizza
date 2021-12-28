import React, { useState, useEffect } from 'react';

interface IExtra {
    extraId: number;
    photo: string;
}

const Extra: React.FunctionComponent<IExtra> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/img', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    return (
        <div className="popup__extra-container">
            <img src={image} alt="" className="popup__extra-photo" />
            <div className="popup__extra-info">
                <span className="popup__extra-name">Tomatos</span>
                <span className="popup__extra-price">1.00$</span>
            </div>
        </div>
    );
}

export default Extra;