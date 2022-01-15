import React, { useState, useEffect } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Popup from '../components/Popup';
import axios from 'axios';
import '../styles/home.css';

interface IPizza {
    id: number;
    name: string;
    description: string;
    defaultPrice: number;
}

interface IHome {
    updateCart: () => void;
}

const Home: React.FunctionComponent<IHome> = (props) => {

    const [pizzaId, setPizzaId] = useState(1);
    const [photo, setPhoto] = useState("-1.jpg");
    const [name, setName] = useState("");
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [pizzasList, setPizzasList] = useState<IPizza[] | null>(null);
    const [pizzas, setPizzas] =  useState<React.FunctionComponent<IPizza>[]>([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const res = await axios.get('http://localhost:8081/pizzas');
        const obj = res.data as IPizza[];
        console.log(obj);
        setPizzasList(obj);
    }

    useEffect(() => {
        const temp: React.FunctionComponent<IPizza>[] = [];
        let counter = 0;
        if (pizzasList) {
            pizzasList.forEach((e: IPizza) => {
                temp.push(
                    <PizzaBlock 
                    key={e.id}
                    name={e.name}
                    photo={`${e.id}.jpg`}
                    defaultPrice={e.defaultPrice}
                    description={e.description}
                    pizzaId={e.id}
                    func={showPopup}
                    /> as unknown as React.FunctionComponent<IPizza>
                );
                counter += 1;
            });
        }
        setPizzas(temp);
    }, [pizzasList]);

    const showPopup = (data: any) => {
        setPizzaId(data.pizzaId);
        setPhoto(data.photo);
        setDefaultPrice(data.defaultPrice);
        setDescription(data.description);
        setName(data.name);
        setIsVisible(true);
    }
    const closePopup = () => {
        setIsVisible(false);
        props.updateCart();
    }
    useEffect(() => {}, [defaultPrice, name, description]);

    useEffect(() => {}, [isVisible]);

    return (
        <div className="home">
            <Popup 
                pizzaId={pizzaId}
                name={name}
                photo={photo}
                isVisible={isVisible}
                defaultPrice={defaultPrice}
                description={description}
                func={closePopup}
            />
            <div className="menu">
                {pizzas}
            </div>
        </div>
    );
}

export default Home;
