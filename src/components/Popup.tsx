import React, { useState, useEffect, useRef } from 'react';
import Extra from './Extra';
import axios from 'axios';

interface IData {
    id: string;
    quantity: string;
    size: string;
    extrasIds: Array<string>;
    defaultPrice: string;
    finalPrice: string;
    extrasPrice: string;
}
interface IPopup {
    pizzaId: number;
    photo: string;
    isVisible: boolean;
    func: () => void;
}

const Popup: React.FunctionComponent<IPopup> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/pizza', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    const bg = useRef<null | HTMLDivElement>(null);
    const submit = useRef<null | HTMLInputElement>(null);
    const form = useRef<null | HTMLFormElement>(null);

    const defaultPrice = 35;
    const [price, setPrice] = useState(defaultPrice);
    const [quantity, setQuantity] = useState(1);
    const [extraPrice, setExtraPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(defaultPrice);

    useEffect(() => {
        if (bg.current) {
            if (props.isVisible) {
                bg.current.style.display = 'flex';
            } else {
                bg.current.style.display = 'none';
            }
        }
    }, [props.isVisible]);

    useEffect(() => {
        setFinalPrice(price * quantity + extraPrice);
    }, [price, quantity, extraPrice]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const id = (target.querySelector('input[name="id"]') as HTMLInputElement).value;
        const quantity = (target.querySelector('input[name="quantity"]') as HTMLInputElement).value;
        const size = (target.querySelector('input[name="size"]:checked') as HTMLInputElement).value;
        const extras = target.querySelectorAll('input[name="extra"]:checked') as NodeListOf<HTMLInputElement>;
        const extrasIds: Array<string> = [];

        extras.forEach((e: HTMLInputElement) => {
            extrasIds.push(e.value);
        });

        const defaultPriceString = String(defaultPrice);
        const finalPriceString = String(finalPrice);
        const data: IData = { 
            id, 
            quantity, 
            size, 
            extrasIds, 
            defaultPrice: defaultPriceString,
            finalPrice: finalPriceString,
            extrasPrice: String(extraPrice),
        };

        console.log(data);

        const cartString: string | null = localStorage.getItem('cart') ?? null;
        if (cartString) {
            const arr = JSON.parse(cartString);
            arr.push(data);
            localStorage.setItem('cart', JSON.stringify(arr));
        } else {
            localStorage.setItem('cart', JSON.stringify([data]));
        }

        // console.log(data);
        // const res = await axios.get('http://localhost:8081/test');
        // const obj = res.data;
        // console.log(obj);
        
        closePopUp();
    }

    const closePopUp = () => {
        setPrice(defaultPrice);
        setQuantity(1);

        if (form.current) {
            const current = form.current;
            const quantity = current.querySelector('.popup__quantity') as HTMLInputElement;
            const size = current.querySelectorAll('.popup__radio')[1] as HTMLInputElement;
            const extras = current.querySelectorAll('.popup__extra-checkbox') as NodeListOf<HTMLInputElement>;

            quantity.value = '1';
            size.checked = true;
            extras.forEach((e) => {
                (e as HTMLInputElement).checked = false;
            });
        }

        props.func();
    }

    const decrement = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        if (target.nextElementSibling) {
            const input = target.nextElementSibling as HTMLInputElement;
            input.stepDown();
            setQuantity(Number(input.value));
        }
    }

    const increment = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        if (target.previousElementSibling) {
            const input = target.previousElementSibling as HTMLInputElement;
            input.stepUp();
            setQuantity(Number(input.value));
        }
    }

    const changeSize = (e: React.MouseEvent) => {
        const target = e.target as HTMLInputElement;
        switch (target.value) {
            case '24':
                setPrice(Math.floor(defaultPrice * 0.8));
                break;
            case '32':
                setPrice(defaultPrice);
                break;
            case '40':
                setPrice(Math.floor(defaultPrice * 1.2));
        }
    }

    const changeExtras = (e: React.MouseEvent) => {
        const target = e.target as HTMLInputElement;
        setExtraPrice((prev) => {
            if (target.checked) {
                return prev + Number(target.value);
            } else {
                return prev - Number(target.value);
            }
        });
    }

    return (
        <div className="popup-bg" ref={bg}>
            <form onSubmit={onSubmit} className="popup" ref={form}>
                <input type="hidden" name="id" value={props.pizzaId} />
                <img className="popup__photo" src={image} />
                <div className="popup__content">
                    <h4 className="popup__name">Pepperoni</h4>
                    <div className="popup__description">
                    Italian herbs, tomato sauce, tomatoes, spicy pepperoni, cheese cubes, mozzarella, ham, mushrooms
                    </div>
                    <div className="popup__quantity-container">
                        <button className="popup__dec" onClick={decrement}>-</button>
                        <input type="number" name="quantity" min={1} max={10} defaultValue={1} className="popup__quantity" />
                        <button className="popup__inc" onClick={increment}>+</button>
                    </div>
                    <div className="popup__radios-container">
                        <div className="popup__radios-items">
                            <div className="popup__radios-item">
                                <input type="radio" onClick={changeSize} name="size" className="popup__radio" defaultValue="24" />
                                <div className="popup__custom-radio">24</div>
                            </div>
                            <div className="popup__radios-item">
                                <input type="radio" onClick={changeSize} name="size" className="popup__radio" defaultValue="32" defaultChecked />
                                <div className="popup__custom-radio">32</div>
                            </div>
                            <div className="popup__radios-item">
                                <input type="radio" onClick={changeSize} name="size" className="popup__radio" defaultValue="40" />
                                <div className="popup__custom-radio">40</div>
                            </div>
                        </div>
                    </div>
                    <div className="popup__extras-container">
                        <div className="popup__extras-item">
                            <input type="checkbox" defaultValue={1} onClick={changeExtras} name="extra" className="popup__extra-checkbox" />
                            <Extra extraId={1} photo="bacon.png" />
                        </div>

                        <div className="popup__extras-item">
                            <input type="checkbox" defaultValue={2} onClick={changeExtras} name="extra" className="popup__extra-checkbox" />
                            <Extra extraId={2} photo="tomatos.png" />
                        </div>

                        <div className="popup__extras-item">
                            <input type="checkbox" defaultValue={3} onClick={changeExtras} name="extra" className="popup__extra-checkbox" />
                            <Extra extraId={3} photo="jalapeno.png" />
                        </div>
                    </div>
                    <input type="submit" value={`Add to cart for ${finalPrice}$`} className="popup__order-button" />
                </div>

                <div className="close-button-container" onClick={closePopUp}>
                    <div className="close-button"></div>
                </div>
            </form>
        </div>
    );
}

export default Popup;