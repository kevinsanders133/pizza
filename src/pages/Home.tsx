import React, { useState, useEffect } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Popup from '../components/Popup';
import IPage from '../interfaces/page';
import '../styles/home.css';

const Home: React.FunctionComponent<IPage> = ({ name }) => {

    const [pizzaId, setPizzaId] = useState(1);
    const [photo, setPhoto] = useState("shrimp.svg");
    const [isVisible, setIsVisible] = useState(false);

    const showPopup = (data: any) => {
        setIsVisible(true);
        setPizzaId(data.pizzaId);
        setPhoto(data.photo);
    }
    const closePopup = () => {
        setIsVisible(false);
    }

    return (
        <div className="home">
            <Popup 
                pizzaId={pizzaId}
                photo={photo}
                isVisible={isVisible}
                func={closePopup}
            />
            <div className="menu">
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="shrimp.svg" 
                    defaultPrice="35"
                    pizzaId={1}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="shrimp.svg" 
                    defaultPrice="35"
                    pizzaId={2}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                    pizzaId={3}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                    pizzaId={4}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                    pizzaId={5}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                    pizzaId={6}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                    pizzaId={7}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                    pizzaId={8}
                    func={showPopup}
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                    pizzaId={9}
                    func={showPopup}
                />
            </div>
        </div>
    );
}

export default Home;
