import React, { useEffect } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import IPage from '../interfaces/page';
import '../styles/home.css';

const Home: React.FunctionComponent<IPage> = ({ name }) => {
    return (
        <div className="home">
            <h1>{name}</h1>
            <div className="menu">
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="shrimp.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="shrimp.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="cheese.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                />
                <PizzaBlock 
                    name="Pepperoni" 
                    photo="burger.svg" 
                    defaultPrice="35"
                />
            </div>
        </div>
    );
}

export default Home;
