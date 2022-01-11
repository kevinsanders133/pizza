import React, { useState, useEffect, useRef, ReactElement } from 'react';
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
    name: string;
    defaultPrice: number;
    description: string;
    photo: string;
    isVisible: boolean;
    func: () => void;
}
interface IExtra {
    id: number;
    name: string;
    price: number;
    photo: string;
}

const Popup: React.FunctionComponent<IPopup> = (props) => {

    const imagesFolder: __WebpackModuleApi.RequireContext = require.context('../public/pizza', true);
    const image: string = imagesFolder(`./${props.photo}`).default;

    const bg = useRef<null | HTMLDivElement>(null);
    const form = useRef<null | HTMLFormElement>(null);

    const name = props.name;
    const defaultPrice = props.defaultPrice;
    const description = props.description;
    const [price, setPrice] = useState(props.defaultPrice);
    const [quantity, setQuantity] = useState(1);
    const [extraPrice, setExtraPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(props.defaultPrice);
    const [extrasList, setExtrasList] = useState<IExtra[] | null>(null);
    const [extras, setExtras] =  useState<ReactElement<any, any>[]>([]);

    useEffect(() => {
        loadExtras();
    }, []);

    const loadExtras = async () => {
        const res = await axios.get('http://localhost:8081/extras');
        const obj = res.data as IExtra[];
        console.log(obj);
        setExtrasList(obj);
    }

    useEffect(() => {
        const temp: ReactElement<any, any>[] = [];
        if (extrasList) {
            extrasList.forEach((e: IExtra) => {
                temp.push(
                    <div className="popup__extras-item" key={e.id}>
                        <input type="checkbox" defaultValue={e.id} onClick={changeExtras} name="extra" className="popup__extra-checkbox" />
                        <Extra 
                        id={e.id}
                        name={e.name}
                        price={e.price}
                        photo={e.photo}
                        />
                    </div>
                );
            });
        }
        setExtras(temp);
    }, [extrasList]);

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
        setPrice(props.defaultPrice);
    }, [props.defaultPrice]);

    useEffect(() => {
        setFinalPrice(Number((price * quantity + extraPrice).toFixed(2)));
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
                    <h4 className="popup__name">{name}</h4>
                    <div className="popup__description">
                    {description}
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
                        {extras}
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